import React, { useEffect } from 'react';
import { AppHeader } from 'app/components/layout/AppHeader';
import { FileTrans } from 'app/components/pages/file/FileTrans';
import { useCoordinateSystemStore } from 'app/stores/coordinateSystem';
import axios from 'axios';
import { PageContainer } from 'shared/styles/styled/common';

export const CoordinateSystemTrans = () => {
  const { setCoordinateSystemList } = useCoordinateSystemStore();
  const getCoordinateSystem = async () => {
    await axios.get('/geolab/api/v1/map/coordinate-system/list').then((e) => {
      setCoordinateSystemList(e.data);
    });
  };
  
  useEffect(() => {
    getCoordinateSystem();
  }, []);

  return (
    <PageContainer>
      <AppHeader />
      <FileTrans />
    </PageContainer>
  );
};
