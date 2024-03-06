import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { MapSearch } from 'app/components/pages/facility-management/map-data-management-system/MapSearch';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { measureControl } from 'shared/modules/gis/measure';
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
  const { measureType, distanceSource, areaSource, setDistanceSource, setDistanceLayer, setAreaSource, setAreaLayer } =
    useMapMeasureStore();

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
      });
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
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
    console.log(map.current?.getStyle());
  }, [zoom]);

  useEffect(() => {
    if (!map.current) return;
    measureControl(map.current);
  }, [distanceSource, areaSource, measureType]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapSearch />
      <MapToolbox />
    </MapContainer>
  );
};
