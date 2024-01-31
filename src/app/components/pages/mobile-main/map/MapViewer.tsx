import React, { useEffect, useRef } from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { LngLatBoundsLike, Map as AppMap } from 'maplibre-gl';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: calc(100% - 3.625rem);
  grid-area: content;
  position: absolute;
  top: 3.625rem;
`;

const MapViewerWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const { zoomLevel: zoom } = useMapOptionsStore();
  const { mapButtonAction,setMapButtonAction } = useMobileMapStore();

  const setMap = (bounds:LngLatBoundsLike) => {
    const container = mapContainer.current || '';
    map.current = initMap(container, zoom, 0, undefined);
    map.current.on('load', () => {
      map.current?.fitBounds(bounds);
    });
    return () => map.current?.remove();
  }

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const bbox:LngLatBoundsLike = [
      [126.9759123, 37.2085123],
      [126.9759123, 37.8085123],
    ]
    setMap(bbox);
  }, []);

  useEffect(() => {
    if(!map.current)
      return

    switch (mapButtonAction){
      case 'reset':
        map.current?.remove();
        setMap(map.current?.getBounds())
        setMapButtonAction('')
        break;
    }
  }, [mapButtonAction]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
    console.log(map.current?.getStyle());
  }, [zoom]);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
    </MapContainer>
  );
};
