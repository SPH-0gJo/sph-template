import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { addVectorTiles } from 'shared/modules/gis/pipeline.vector.tiles';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.main`
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
  const { zoomLevel: zoom } = useMapOptionsStore();
  const { setLayerGroup } = useGsfLayerStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    const center = [127.893, 36.367];
    map.current = initMap(container, zoom, 0, center);
    map.current.on('load', () => {
      map.current?.loadImage('/assets/images/img_1.png', (error, image) => {
        if (error) throw error;
        if (!image) return;
        map.current?.addImage('shop-icon', image, { sdf: true });
        map.current && addVectorTiles(map.current);
      });
    });
    return () => map.current?.remove();
  }, []);

  return (
    <MapContainer>
      <MapViewerWrapper ref={mapContainer} />
      <MapToolbox />
    </MapContainer>
  );
};
