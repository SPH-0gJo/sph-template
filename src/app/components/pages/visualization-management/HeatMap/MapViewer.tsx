import React, { useEffect, useRef } from 'react';
import { addHeatMap } from 'app/components/pages/visualization-management/HeatMap/heatmap.layer';
import { HMLegend } from 'app/components/pages/visualization-management/HeatMap/HMLegend';
import { Map as AppMap } from 'maplibre-gl';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const MapViewerWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const container = mapContainer.current || '';
    const center = [128.9742, 35.1636];
    map.current = initMap(container, 9, 2, center);
    map.current.on('load', () => {
      map.current && addHeatMap(map.current);
      return () => map.current?.remove();
    });
  }, []);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <HMLegend />
    </MapContainer>
  );
};
