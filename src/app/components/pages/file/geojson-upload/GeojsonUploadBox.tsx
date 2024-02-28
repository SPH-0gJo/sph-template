import React from 'react';
import { CurrentMapSection } from 'app/containers/pages/file/CurrentMapSection';
import { FileUploadSection } from 'app/containers/pages/file/FileUploadSection';
import { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: pink;
  position: relative;
`;

const UploadTitle = styled.div`
  width: 100%;
  height: 3rem;
  background-color: var(--white-a100);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.075rem solid var(--black-a8);
`;

interface GeojsonUploadBox {
  map: AppMap | null;
}

export const GeojsonUploadBox = (props: GeojsonUploadBox) => {
  const { map } = props;

  return (
    <UploadWrapper>
      <UploadTitle>
        <h5>GeoJson File Upload System</h5>
      </UploadTitle>
      <CurrentMapSection map={map} />
      <FileUploadSection map={map} />
    </UploadWrapper>
  );
};
