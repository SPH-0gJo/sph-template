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

interface GeojsonUploadBox {
  map: AppMap | null;
  colorMap: Map<string, string>;
}

export const GeojsonUploadBox = (props: GeojsonUploadBox) => {
  const { map, colorMap } = props;

  return (
    <UploadWrapper>
      <CurrentMapSection map={map} colorMap={colorMap} />
      <FileUploadSection map={map} />
    </UploadWrapper>
  );
};
