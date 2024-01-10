import React from 'react';
import styled from 'styled-components';

import { MapViewer } from 'app/components/pages/layer-management/MapViewer';

const MapCompareContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  div:first-child {
    border-right: 1px solid var(--dark-surface-level-0);
  }
  div:last-child {
    border-left: 0.05rem solid var(--dark-surface-level-0);
  }
`;

const LeftMapWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
export const MapCompare = () => {
  return (
    <MapCompareContainer>
      <LeftMapWrapper>
        <MapViewer data={{ requestType: 'wms' }} />
      </LeftMapWrapper>
      <LeftMapWrapper>
        <MapViewer data={{ requestType: 'vector-tile' }} />
      </LeftMapWrapper>
    </MapCompareContainer>
  );
};
