import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { GeojsonUpload } from 'app/components/pages/file/geojson-upload/GeojsonUpload';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const GeojsonUploadSystem = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', '지도 파일 관리', '벡터 타일셋 생성하기']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <GeojsonUpload />
    </PageContainer>
  );
};
