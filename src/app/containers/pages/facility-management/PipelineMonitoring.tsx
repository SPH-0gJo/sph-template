import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapAside } from 'app/components/pages/facility-management/pipeline-monitoring-system/aside/MapAside';
import { MapViewer } from 'app/components/pages/facility-management/pipeline-monitoring-system/contents/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-columns: 32rem 1fr;
  grid-template-areas: 'aside content';
  transition: all 0.3s ease;
`;

export const PipelineMonitoring = () => {
  const { setBreadcrumb } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumb(['Main', '시설물 관리', '실시간 시설물 모니터링']);
  }, []);

  return (
    <PageContainer>
      <AppHeader />
      <MapWrapper>
        <MapAside />
        <MapViewer />
      </MapWrapper>
    </PageContainer>
  );
};
