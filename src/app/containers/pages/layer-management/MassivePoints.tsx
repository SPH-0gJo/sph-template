import React, { useEffect } from 'react';

import { MapViewer } from 'app/components/pages/layer-management/MassivePoints/MapViewer';
import { AppHeader } from 'app/components/layout/AppHeader';

import { PageContainer } from 'shared/styles/styled/common';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';

export const MassivePoints = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', '레이어 관리', '대용량 Point 데이터 시각화']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
