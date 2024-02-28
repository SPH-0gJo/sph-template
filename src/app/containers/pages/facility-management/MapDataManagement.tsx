import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/facility-management/map-data-management-system/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const MapDataManagement = () => {
  const { setBreadcrumb } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumb(['Main', '시설물 관리', '시설물 지도(도면)관리 서비스']);
  }, []);

  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
