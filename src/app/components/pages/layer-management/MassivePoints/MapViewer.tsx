import React, { useEffect, useRef, useState } from 'react';
import {
  addMassivePoints,
  removeMassivePoints,
  sourceName,
} from 'app/components/pages/layer-management/MassivePoints/songdo.asc_step7.mv';
import { StyleEditor } from 'app/components/pages/layer-management/MassivePoints/StyleEditor';
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
  // const { zoomLevel: zoom } = useMapOptionsStore();
  const [pointCount, setPointCount] = useState(100);

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const container = mapContainer.current || '';
    const center = [126.64261, 37.38354];
    map.current = initMap(container, 13, 2, center);
    map.current.on('load', () => {
      map.current && addMassivePoints(map.current, pointCount);
    });
    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    const source = map.current?.getSource(sourceName);
    console.log(source);
    removeMassivePoints(map.current);
    addMassivePoints(map.current, pointCount);
  }, [pointCount]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <StyleEditor data={{ pointCount }} changePointCount={setPointCount} />
    </MapContainer>
  );
};
