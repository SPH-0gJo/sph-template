import React, { useEffect, useState } from 'react';
import { Map } from 'react-map-gl';
import {
  addHexagonLayer,
  lightingEffect,
} from 'app/components/pages/visualization-management/hexagon-layer/hexagon.layer';
import { HexagonInfo } from 'app/components/pages/visualization-management/hexagon-layer/HexagonInfo';
import { useHexagonStore } from 'app/stores/visualization/hexagon.layer';
import axios from 'axios';
import { DeckGL } from 'deck.gl/typed';
import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import { hexagonData } from 'shared/constants/types/visualization.layer';
import styled from 'styled-components';

const dataUrl = '/src/shared/fixtures/hexagon_data.json';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

export const hxInitMapState = {
  longitude: 127.5,
  latitude: 36,
  zoom: 7,
  pitch: 35.5,
  bearing: -20,
};

export const MapViewer = () => {
  const [layers, setLayers] = useState<any[]>([]);
  const [data, setData] = useState<number[][] | null>(null);
  const { coverage, radius, upper } = useHexagonStore();
  const fetchData = async () => {
    const response = await axios.get(dataUrl);
    const data = response.data as Array<hexagonData>;
    setData(data.map(({ x, y }) => [y, x]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setLayers([addHexagonLayer(data, coverage, radius, upper)]);
  }, [data, coverage, radius, upper]);

  return (
    <MapContainer>
      {data && (
        <>
          <DeckGL layers={layers} effects={[lightingEffect]} initialViewState={hxInitMapState} controller={true}>
            <Map reuseMaps mapLib={maplibregl as unknown as undefined} mapStyle={vectorTileBaseMaps[3].style} />
          </DeckGL>
          <HexagonInfo />
        </>
      )}
    </MapContainer>
  );
};
