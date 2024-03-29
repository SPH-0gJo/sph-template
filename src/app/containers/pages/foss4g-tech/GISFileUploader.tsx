import React from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { FileUploader } from 'app/components/pages/foss4g-tech/gis-file-uploader/FileUploader';
import { PageContainer } from 'shared/styles/styled/common';

export const GISFileUploader = () => {
  return (
    <PageContainer>
      <AppHeader />
      <FileUploader />
    </PageContainer>
  );
};
