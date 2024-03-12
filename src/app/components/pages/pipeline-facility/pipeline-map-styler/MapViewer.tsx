import React, { useEffect, useRef, useState } from 'react';
import { GeolabNaverRoadView } from 'app/components/common/map/GeolabNaverRoadView';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { Button } from 'app/components/common-ui';
import { GSFLayerBox } from 'app/components/pages/pipeline-facility/pipeline-map-styler/GSFLayerBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useNaverRoadViewStore } from 'app/stores/map/naverRoadView';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { LayerStyle } from 'shared/fixtures/pipeline';
import { measureControl } from 'shared/modules/gis/measure';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const NaverRoadViewFooter = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  padding: 0.75rem 1.2rem;
  button {
    margin-left: auto;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

const NaverRoadViewContainer = styled.div`
  position: absolute;
  top: 6.525rem;
  right: 4.525rem;
  border: 0.15rem solid var(--light-surface-level-2);
  background-color: var(--white);
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { style, zoomLevel: zoom, setStyleOption } = useMapOptionsStore();
  const { naverRoadViewMap, naverRoadViewCoords, setNaverRoadViewCoords, setNaverRoadViewMap } =
    useNaverRoadViewStore();
  const { setLayerGroup } = useGsfLayerStore();
  const { measureType, distanceSource, areaSource, setDistanceSource, setDistanceLayer, setAreaSource, setAreaLayer } =
    useMapMeasureStore();
  const { gsfLayerGroups, layerStyleEditorId } = useGsfLayerStore();

  const handler = (e: MapMouseEvent) => {
    console.log('handler');
    const { lng, lat } = e.lngLat;
    setNaverRoadViewCoords({ lng, lat });
  };

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current && addVectorTiles(map.current);
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
    return () => {
      setDistanceSource(null);
      setDistanceLayer(null);
      setAreaSource(null);
      setAreaLayer(null);
      setStyleOption(vectorTileBaseMaps[0].style);
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !style) return;
    map.current.setStyle(style, { diff: false });
    map.current.once('styledata', () => map.current && addVectorTiles(map.current));
  }, [style]);

  useEffect(() => {
    if (naverRoadViewMap) map.current?.on('click', handler);
    else map.current?.off('click', handler);
  }, [naverRoadViewMap]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);

  useEffect(() => {
    if (!map.current) return;
    measureControl(map.current);
  }, [distanceSource, areaSource, measureType]);

  useEffect(() => {
    if (!gsfLayerGroups || !map.current || !layerStyleEditorId) return;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    const { style } = layer!;
    if (!style) return;
    const paintProperties = Object.keys(style);
    paintProperties.forEach(
      (propertyName) =>
        map.current?.setPaintProperty(layerStyleEditorId, propertyName, style[propertyName as keyof LayerStyle]),
    );
  }, [gsfLayerGroups, layerStyleEditorId]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox />
      <GSFLayerBox data={{ appMap: map.current }} />
      {!naverRoadViewMap || (
        <NaverRoadViewContainer className={`${naverRoadViewCoords ? '' : 'visible'}`}>
          <GeolabNaverRoadView />
          <NaverRoadViewFooter>
            <Button color='dark' size='md' onClick={() => setNaverRoadViewMap()}>
              닫기
            </Button>
          </NaverRoadViewFooter>
        </NaverRoadViewContainer>
      )}
    </MapContainer>
  );
};
