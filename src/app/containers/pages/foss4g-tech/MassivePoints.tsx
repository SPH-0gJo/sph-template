import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/foss4g-tech/MassivePoints/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const MassivePoints = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', 'Layer 관리', '대용량 Point 데이터 시각화']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
