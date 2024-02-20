import React from 'react';
import { createRoot } from 'react-dom/client';
import maplibregl, { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const PointPopupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.1rem 0.4rem;
  gap: 0.2rem;

  & span {
    font-weight: var(--text-weight-bold);
  }
`;

const PointPopupBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PointInfoProps {
  map?: AppMap;
  lngLat: [number, number];
  properties: { stop_name: string };
}

const PointPopup = ({ lngLat, properties }: PointInfoProps) => {
  const [lng, lat] = lngLat;

  return (
    <PointPopupWrapper>
      <span className='subtitle'>{properties.stop_name}</span>
      <PointPopupBottom>
        <label>LON : {lng.toFixed(5)}</label>
        <label>LAT : {lat.toFixed(5)}</label>
      </PointPopupBottom>
    </PointPopupWrapper>
  );
};

export default ({ map, lngLat, properties }: PointInfoProps) => {
  if (!map) return;
  const placeholder = document.createElement('div');
  createRoot(placeholder).render(<PointPopup lngLat={lngLat} properties={properties} />);

  new maplibregl.Popup().setLngLat(lngLat).setDOMContent(placeholder).addTo(map);
};
