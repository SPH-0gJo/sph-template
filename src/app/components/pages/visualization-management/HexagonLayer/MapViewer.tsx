import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-map-gl';
import {
  addHexagonLayer,
  lightingEffect,
} from 'app/components/pages/visualization-management/HexagonLayer/hexagon.layer';
import { HexagonInfo } from 'app/components/pages/visualization-management/HexagonLayer/HexagonInfo';
import { useHexagonStore } from 'app/stores/visualization/hexagon.layer';
import axios from 'axios';
import { DeckGL } from 'deck.gl/typed';
import maplibregl, { Map as AppMap } from 'maplibre-gl';
import { hexagonData } from 'shared/constants/types/visualization.layer';
import { initMap } from 'shared/modules/map.utils';
import styled from 'styled-components';

const dataUrl = '/public/assets/data/hexagon_test.json';

export const hxInitMapState = {
  longitude: 127.5,
  latitude: 36,
  zoom: 7,
  pitch: 35.5,
  bearing: -20,
};

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const [layers, setLayers] = useState<any[]>([]);
  const [data, setData] = useState<number[][] | null>(null);
  const { coverage, radius, upper } = useHexagonStore();

  useEffect(() => {
    if (map.current || !mapContainer) return;
    const center = [hxInitMapState.longitude, hxInitMapState.latitude];
    const container = mapContainer.current || '';
    map.current = initMap(container, hxInitMapState.zoom, 3, center);

    const fetchData = async () => {
      const response = await axios.get(dataUrl);
      const data = response.data as Array<hexagonData>;
      setData(data.map(({ x, y }) => [y, x]));
    };

    fetchData();

    map.current.on('load', () => {
      return () => map.current?.remove();
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    const tempLayer = [addHexagonLayer(data, coverage, radius, upper)];
    setLayers(tempLayer);
  }, [data, coverage]);

  return (
    <MapContainer ref={mapContainer}>
      {
        map.current && data &&
        <DeckGL
          layers={layers}
          effects={[lightingEffect]}
          initialViewState={hxInitMapState}
          controller={true}
        >
          <Map
            reuseMaps
            mapLib={maplibregl as unknown as undefined}
            mapStyle={map.current.getStyle() as unknown as string}
          />
          <HexagonInfo />
        </DeckGL>
      }
    </MapContainer>
  );
};