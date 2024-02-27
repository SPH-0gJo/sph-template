import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { GSFLayerBox } from 'app/components/pages/facility-management/pipeline-management-system/GSFLayerBox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { LayerStyle } from 'shared/fixtures/pipeline';
import { addMeasureLayers, measureDistanceAction, removeMeasureLayers } from 'shared/modules/gis/measure.distance';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

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

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { style, zoomLevel: zoom, setStyleOption } = useMapOptionsStore();
  const { setLayerGroup } = useGsfLayerStore();
  const { measureType, distanceSource, setDistanceSource, setDistanceLayer } = useMapMeasureStore();
  const { gsfLayerGroups, layerStyleEditorId } = useGsfLayerStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current?.loadImage('/assets/images/img_1.png', (error, image) => {
        if (error) throw error;
        if (!image) return;
        map.current?.addImage('shop-icon', image, { sdf: true });
        map.current && addVectorTiles(map.current);
        map.current && addMeasureLayers(map.current, distanceSource, measureType);
      });
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
    return () => {
      map.current && removeMeasureLayers(map.current);
      setDistanceSource(null);
      setDistanceLayer(null);
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
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
    console.log(map.current?.getStyle());
  }, [zoom]);

  useEffect(() => {
    if (!map.current) return;
    const measure = measureType !== 'none';
    const style = map.current.getCanvas().style;
    style.cursor = measureType !== 'none' ? 'crosshair' : 'default';

    removeMeasureLayers(map.current);
    addMeasureLayers(map.current, distanceSource, measureType);

    measureType === 'distance' && map.current.on('click', measureDistanceAction);
    !measure && map.current.off('click', measureDistanceAction);
  }, [distanceSource, measureType]);

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
    </MapContainer>
  );
};
