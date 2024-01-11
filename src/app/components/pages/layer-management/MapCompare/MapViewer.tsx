import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Map as AppMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { initMap } from 'shared/modules/map.utils';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { addVectorTiles } from 'app/components/pages/facility-management/pipeline-management-system/pipeline.vector.tiles';
import { getMapByWMS } from 'app/components/pages/layer-management/pipeline.wms.getmap';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface MapViewerProps {
  data: {
    requestType: 'wms' | 'vector-tile';
  };
}

export const MapViewer = (props: MapViewerProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { zoomLevel: zoom } = useMapOptionsStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 2, undefined);
    map.current.on('load', () => {
      map.current?.fitBounds([
        [126.51718139648438, 35.9637451171875], // southwestern corner of the bounds
        [127.57186889648438, 36.98272705078125], // northeastern corner of the bounds
      ]);
      props.data.requestType === 'wms'
        ? map.current && getMapByWMS(map.current)
        : map.current && addVectorTiles(map.current);
      return () => map.current?.remove();
    });
  }, [zoom]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
    </MapContainer>
  );
};
