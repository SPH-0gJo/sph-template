import React, { useEffect } from 'react';

import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/facility-management/pipeline-management-system/MapViewer';

import { PageContainer } from 'shared/styles/styled/common';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';

export const PipelineManagement = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', '시설물 관리', '배관시설물 관리']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
