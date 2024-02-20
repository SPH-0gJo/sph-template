import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-map-gl';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers/typed';
import {
  addScreenGridLayer,
} from 'app/components/pages/visualization-management/screen-grid/screenGrid.layer';
import { ScreenGridInfo } from 'app/components/pages/visualization-management/screen-grid/ScreenGridInfo';
import { useScreenGridStore } from 'app/stores/visualization/screenGrid.layer';
import axios from 'axios';
import { DeckGL } from 'deck.gl/typed';
import maplibregl, { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9.6,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';


export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<AppMap | null>(null);
  const [layers, setLayers] = useState<ScreenGridLayer[]>([]);
  const [data, setData] = useState<number[][] | null>(null);
  const { cellSize, gpuAggregation } = useScreenGridStore();
  const fetchData = async () => {
    const response = await axios.get(DATA_URL);
    const data = response.data;
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (!data) return;
    setLayers([addScreenGridLayer(data, cellSize, gpuAggregation)]);
  }, [data, cellSize, gpuAggregation]);


  return (
    <MapContainer ref={mapContainer}>
      {data &&
        <DeckGL
          layers={layers}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}>
          <Map reuseMaps mapLib={maplibregl as unknown as undefined} mapStyle={MAP_STYLE} />
        </DeckGL>}
      <ScreenGridInfo />
    </MapContainer>
  );
};
