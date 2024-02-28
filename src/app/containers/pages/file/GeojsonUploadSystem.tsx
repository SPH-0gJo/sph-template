import React from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { GeojsonUpload } from 'app/components/pages/file/geojson-upload/GeojsonUpload';
import { PageContainer } from 'shared/styles/styled/common';

export const GeojsonUploadSystem = () => {
  return (
    <PageContainer>
      <AppHeader />
      <GeojsonUpload />
    </PageContainer>
  );
};
