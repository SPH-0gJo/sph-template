import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CoordinateSystemTrans } from 'app/containers/pages/file/CoordinateSystemTrans';
import { GeojsonUploadSystem } from 'app/containers/pages/file/GeojsonUploadSystem';
import { GeoDrawingCanvas } from 'app/containers/pages/foss4g-tech/GeoDrawingCanvas';
import { GISFileUploader } from 'app/containers/pages/foss4g-tech/GISFileUploader';
import { InfoWindow } from 'app/containers/pages/foss4g-tech/InfoWindow';
import { MapCompare } from 'app/containers/pages/foss4g-tech/MapCompare';
import { MassivePoints } from 'app/containers/pages/foss4g-tech/MassivePoints';
import { GeolabMain } from 'app/containers/pages/GeolabMain';
import { UIGuidePage } from 'app/containers/pages/guide/UIGuidePage';
import { MobileMain } from 'app/containers/pages/MobileMain';
import { MapDataManagement } from 'app/containers/pages/pipeline-facility/MapDataManagement';
import { PipelineManagement } from 'app/containers/pages/pipeline-facility/PipelineManagement';
import { ValveClusterMap } from 'app/containers/pages/pipeline-facility/ValveClusterMap';
import { ContourLayer } from 'app/containers/pages/visualization-management/ContourLayer';
import { HeatMap } from 'app/containers/pages/visualization-management/HeatMap';
import { HexagonLayer } from 'app/containers/pages/visualization-management/HexagonLayer';
import { ScreenGrid } from 'app/containers/pages/visualization-management/ScreenGrid';
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
          <Route path='/geolab/guide' element={<UIGuidePage />} />
          <Route path='/geolab' element={<GeolabMain />} />
          <Route path='/geolab/fm/pm' element={<PipelineManagement />} />
          <Route path='/geolab/fm/mm' element={<MapDataManagement />} />
          <Route path='/geolab/lm/mc' element={<MapCompare />} />
          <Route path='/geolab/lm/mp' element={<MassivePoints />} />
          <Route path='/geolab/lm/iw' element={<InfoWindow />} />
          <Route path='/geolab/gv/hm' element={<HeatMap />} />
          <Route path='/geolab/gv/hl' element={<HexagonLayer />} />
          <Route path='/geolab/gv/sg' element={<ScreenGrid />} />
          <Route path='/geolab/gv/cl' element={<ContourLayer />} />
          <Route path='/geolab/m/mm' element={<MobileMain />} />
          <Route path='/geolab/layer/uploader' element={<GISFileUploader />} />
          <Route path='/geolab/file/coordinate-system/trans' element={<CoordinateSystemTrans />} />
          <Route path='/geolab/file/geojson/upload' element={<GeojsonUploadSystem />} />
          <Route path='/geolab/fm/valve-cluster' element={<ValveClusterMap />} />
          <Route path='/geolab/foss4g-tech/drawing' element={<GeoDrawingCanvas />} />
        </Routes>
      </BrowserRouter>
    </AppPage>
  );
};
