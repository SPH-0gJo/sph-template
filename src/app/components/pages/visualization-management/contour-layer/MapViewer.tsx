import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-map-gl';
import { addContourLayer } from 'app/components/pages/visualization-management/contour-layer/contour.layer';
import { ContourInfo } from 'app/components/pages/visualization-management/contour-layer/ContourInfo';
import { useContourStore } from 'app/stores/visualization/contour.layer';
import { DeckGL } from 'deck.gl/typed';
import maplibregl from 'maplibre-gl';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import styled from 'styled-components';

export const ctInitMapState = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

export const MapViewer = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [layers, setLayers] = useState<any[]>([]);
  const { cellSize, week } = useContourStore();

  useEffect(() => {
    setLayers([addContourLayer(cellSize, week)]);
  }, [cellSize, week]);

  return (
    <MapContainer ref={mapContainer}>
      <>
        <DeckGL layers={layers} initialViewState={ctInitMapState} controller={true}>
          <Map reuseMaps mapLib={maplibregl as unknown as undefined} mapStyle={vectorTileBaseMaps[3].style} />
        </DeckGL>
        <ContourInfo />
      </>
    </MapContainer>
  );
};
