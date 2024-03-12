import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { MapViewer } from 'app/components/pages/foss4g-tech/geo-drawing-canvas/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const GeoDrawingCanvas = () => {
  const { setBreadcrumb } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumb(['Main', '오픈소스 GIS 테크', '지도 그리기 도구']);
  }, []);

  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
    </PageContainer>
  );
};
