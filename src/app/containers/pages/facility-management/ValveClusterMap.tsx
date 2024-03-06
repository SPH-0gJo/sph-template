import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { ClusterMapLegends } from 'app/components/pages/facility-management/valve-cluster-map/ClusterMapLegends';
import { MapViewer } from 'app/components/pages/facility-management/valve-cluster-map/MapViewer';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
import { PageContainer } from 'shared/styles/styled/common';

export const ValveClusterMap = () => {
  const { setBreadcrumb } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumb(['Main', '배관시설물 관리', '밸브 클러스터맵']);
  }, []);
  return (
    <PageContainer>
      <AppHeader />
      <MapViewer />
      <ClusterMapLegends />
    </PageContainer>
  );
};
