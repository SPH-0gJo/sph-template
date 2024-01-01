import React from 'react';
import styled from 'styled-components';

import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/facility-management/pipeline-management-system/MapViewer';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 5.625rem 1fr;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-areas:
    'header'
    'content';
`;

export const PipelineManagement = () => {
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
