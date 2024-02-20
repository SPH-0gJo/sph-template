import React, { useEffect, useState } from 'react';
import { Map } from 'react-map-gl';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers/typed';
import { addScreenGridLayer } from 'app/components/pages/visualization-management/screen-grid/screengrid.layer';
import { ScreenGridInfo } from 'app/components/pages/visualization-management/screen-grid/ScreenGridInfo';
import { useScreenGridStore } from 'app/stores/visualization/screenGrid.layer';
import axios from 'axios';
import { DeckGL } from 'deck.gl/typed';
import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

const DATA_URL = '/src/shared/fixtures/screen_grid_data.json';

const INITIAL_VIEW_STATE = {
  longitude: 126.9595,
  latitude: 37.5625,
  zoom: 11,
};

export const MapViewer = () => {
  const [layers, setLayers] = useState<ScreenGridLayer[]>([]);
  const [data, setData] = useState<Array<[number, number, number]> | null>(null);
  const { cellSize, gpuAggregation } = useScreenGridStore();
  const fetchData = async () => {
    const response = await axios.get(DATA_URL);
    const data = response.data.DATA;

    const tempData: Array<[number, number, number]> = [];
    data.forEach((d: { lng?: number; lat?: number; rates?: number }) => {
      if (!d.lng || !d.lat || !d.rates) return;
      return tempData.push([d.lng, d.lat, d.rates]);
    });
    setData(tempData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setLayers([addScreenGridLayer(data, cellSize, gpuAggregation)]);
  }, [data, cellSize, gpuAggregation]);

  return (
    <MapContainer>
      {data && (
        <DeckGL layers={layers} initialViewState={INITIAL_VIEW_STATE} controller={true}>
          <Map reuseMaps mapLib={maplibregl as unknown as undefined} mapStyle={vectorTileBaseMaps[3].style} />
        </DeckGL>
      )}
      <ScreenGridInfo />
    </MapContainer>
  );
};
