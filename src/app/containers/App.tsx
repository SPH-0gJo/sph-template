import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PipelineManagement } from 'app/containers/pages/facility-management/PipelineManagement';
import { GeolabMain } from 'app/containers/pages/GeolabMain';
import { UIGuidePage } from 'app/containers/pages/guide/UIGuidePage';
import { MapCompare } from 'app/containers/pages/layer-management/MapCompare';
import { MassivePoints } from 'app/containers/pages/layer-management/MassivePoints';
import styled from 'styled-components';
import { InfoWindow } from 'app/containers/pages/layer-management/InfoWindow';

const AppPage = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const App = () => {
  return (
    <AppPage>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/geolab' />} />
          <Route path='/geolab/guide' element={<UIGuidePage />} />
          <Route path='/geolab' element={<GeolabMain />} />
          <Route path='/geolab/fm/pm' element={<PipelineManagement />} />
          <Route path='/geolab/lm/mc' element={<MapCompare />} />
          <Route path='/geolab/lm/mp' element={<MassivePoints />} />
          <Route path='/geolab/lm/iw' element={<InfoWindow />} />
        </Routes>
      </BrowserRouter>
    </AppPage>
  );
};
