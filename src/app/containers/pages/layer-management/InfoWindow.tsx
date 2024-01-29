import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/layer-management/InfoWindow/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const InfoWindow = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', 'Layer 관리', 'Vector tile 정보 표출']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
