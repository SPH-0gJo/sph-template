import React, { useEffect, useState } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/layer-management/MapCompare/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import styled from 'styled-components';

const MapCompareContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  div:first-child {
    border-right: 1px solid var(--dark-surface-level-0);
  }
  div:last-child {
    border-left: 0.05rem solid var(--dark-surface-level-0);
  }
`;

const Maps = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MapWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
export const MapCompare = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  const [ curPosition, setCurPosition] = useState<Array<Array<number>>>([[]]);
  const [ isMove, setIsMove] = useState<number>(0)
  useEffect(() => {
    setBreadcrumb(['Main', '시설물 관리', '배관시설물 관리']);
  }, []);
  return (
    <MapCompareContainer>
      <AppHeader />
      <Maps>
        <MapWrapper>
          <MapViewer isMove={isMove} num={1} setIsMove={setIsMove} curPosition={curPosition} setCurPosition={setCurPosition} data={{ requestType: 'wms' }} />
        </MapWrapper>
        <MapWrapper>
          <MapViewer isMove={isMove} num={2} setIsMove={setIsMove} curPosition={curPosition} setCurPosition={setCurPosition} data={{ requestType: 'vector-tile' }} />
        </MapWrapper>
      </Maps>
    </MapCompareContainer>
  );
};
