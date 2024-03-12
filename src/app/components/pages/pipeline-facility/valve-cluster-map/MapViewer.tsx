import React, { useEffect, useRef, useState } from 'react';
import { addValveClusterLayers } from 'app/components/pages/pipeline-facility/valve-cluster-map/valve.cluster';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
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
  const { zoomLevel: zoom, setZoom } = useMapOptionsStore();
  useEffect(() => {
    if (map.current || !mapContainer) return;
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 3, undefined);
    map.current.on('load', () => {
      map.current && addValveClusterLayers(map.current);
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
    });
    map.current?.on('zoom', (e) => {
      const currentZoom = e.target.getZoom();
      setZoom(currentZoom);
    });
  }, []);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
    </MapContainer>
  );
};
