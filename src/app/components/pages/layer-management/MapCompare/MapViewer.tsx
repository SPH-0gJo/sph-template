import React, { useEffect, useRef } from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { getMapByWMS } from 'shared/modules/gis/pipeline.wms.getmap';
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
    map.current.on('moveend', () => {
      if (props.data.requestType === 'vector-tile') return;
      map.current && getMapByWMS(map.current);
    });
  }, [zoom]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
    </MapContainer>
  );
};
