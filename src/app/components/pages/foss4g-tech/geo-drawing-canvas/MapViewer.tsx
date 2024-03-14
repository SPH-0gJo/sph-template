import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { DrawingControl } from 'app/components/pages/foss4g-tech/geo-drawing-canvas/DrawingControl';
import { Map as AppMap } from 'maplibre-gl';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

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
    const center = [126.64261, 37.38354];
    map.current = initMap(container, 13, 0, center);
    return () => map.current?.remove();
  }, []);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox data={{ appMap: map.current }} />
      <DrawingControl data={{ appMap: map.current }} />
    </MapContainer>
  );
};
