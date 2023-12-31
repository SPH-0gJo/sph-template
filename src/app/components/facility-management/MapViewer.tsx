import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import maplibregl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useMapOptionsStore } from 'app/stores/mapOptions';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { initCoords } from 'shared/constants/varibales';
import { measureDistanceAction, drawNRemoveLayers } from './measure.distance';

import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';

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
  const map = useRef<Map | null>(null);
  const { measureType, style, zoomLevel: zoom, setMeasuredValue } = useMapOptionsStore();
  const [lng, lat] = initCoords;

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current || '',
      hash: true,
      style: vectorTileBaseMaps[0].style,
      center: [lng, lat],
      zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current || !style) return;
    map.current?.setStyle(style);
  }, [style]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
  }, [zoom]);

  useEffect(() => {
    if (!map.current) return;
    const measure = measureType !== 'none';
    const style = map.current.getCanvas().style;
    style.cursor = measureType !== 'none' ? 'crosshair' : 'default';
    drawNRemoveLayers(map.current, measure);
    measure && map.current.on('click', measureDistanceAction);
    !measure && map.current.off('click', measureDistanceAction);
  }, [measureType]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox />
    </MapContainer>
  );
};
