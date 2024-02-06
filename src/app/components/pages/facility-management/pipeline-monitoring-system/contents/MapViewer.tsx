import React, { useEffect, useRef } from 'react';
import { MapToolbox } from 'app/components/common/map/toolbox/MapToolbox';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { Map as AppMap } from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { drawNRemoveLayers, measureDistanceAction } from 'shared/modules/gis/measure.distance';
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
  const { measureType, style, zoomLevel: zoom, setStyleOption } = useMapOptionsStore();
  const { setLayerGroup } = useGsfLayerStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    setLayerGroup();
    const container = mapContainer.current || '';
    const center = [127.893, 36.367];
    map.current = initMap(container, zoom, 0, center);
    return () => {
      setStyleOption(vectorTileBaseMaps[0].style);
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !style) return;
    map.current.setStyle(style, { diff: false });
    map.current.once('styledata', () => map.current);
  }, [style]);

  useEffect(() => {
    if (!map.current || !zoom) return;
    map.current?.zoomTo(zoom, { duration: 1000 });
    console.log(map.current?.getStyle());
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
