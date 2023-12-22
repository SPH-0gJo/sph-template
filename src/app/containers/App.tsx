import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { GeolabMain } from 'app/containers/pages/GeolabMain';
import { GeolabSample } from 'app/containers/pages/Geolab.sample';

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
          <Route path='/geolab' element={<GeolabMain />} />
          <Route path='/geolab/map' element={<GeolabSample />} />
        </Routes>
      </BrowserRouter>
    </AppPage>
  );
};
