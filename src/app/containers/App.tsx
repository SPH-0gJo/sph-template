import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { GeolabSample } from 'app/containers/pages/Geolab.sample';

const AppPage = styled.main`
  width: 100vw;
  height: 100vh;
`;

export const App = () => {
  return (
    <AppPage>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='/main' element={<GeolabSample />} />
        </Routes>
      </BrowserRouter>
    </AppPage>
  );
};
