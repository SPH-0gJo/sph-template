import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PipelineManagement } from 'app/containers/pages/facility-management/PipelineManagement';
import { GeolabMain } from 'app/containers/pages/GeolabMain';
import { MapCompare } from 'app/containers/pages/layer-management/MapCompare';
import { MassivePoints } from 'app/containers/pages/layer-management/MassivePoints';
import { SamplePage } from 'app/containers/pages/SamplePage';
import styled from 'styled-components';

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
          <Route path='/sample' element={<SamplePage />} />
          <Route path='/geolab' element={<GeolabMain />} />
          <Route path='/geolab/fm/pm' element={<PipelineManagement />} />
          <Route path='/geolab/lm/mc' element={<MapCompare />} />
          <Route path='/geolab/lm/mp' element={<MassivePoints />} />
        </Routes>
      </BrowserRouter>
    </AppPage>
  );
};
