import React, { useEffect, useRef, useState } from 'react';
import {
  addMonitoringLayer
} from 'app/components/pages/facility-management/pipeline-monitoring-system/contents/monitoring_layer';
import { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const LayerWrapper = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid var(--light-surface-level-0);
    border-radius: 0.625rem;
    padding: 0.5rem 1rem;
`;

const LayerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.66;
    & em {
        cursor: pointer;
    }
`;

export const LayerList = () => {
  const [groupIdList, setGroupIdList] = useState<Array<string>>();

  useEffect(() => {
    setGroupIdList(['pipeline']);
  }, []);

  return (
    <LayerWrapper>
      <LayerHeader>
        <div>레이어 추가</div>
        <em className="icon-plus"></em>
      </LayerHeader>
    </LayerWrapper>
  );
};