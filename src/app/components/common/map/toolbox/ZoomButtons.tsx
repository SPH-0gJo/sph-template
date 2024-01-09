import React from 'react';
import { ToolboxButtonWrapper, ToolboxButton } from 'shared/styles/styled/common';
import { useMapOptionsStore } from 'app/stores/mapOptions';

export const ZoomButtons = () => {
  const { setZoomLevel } = useMapOptionsStore();
  return (
    <ToolboxButtonWrapper>
      <ToolboxButton title='초기화'></ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(1)} title='확대'>
        <em className='icon-plus' />
      </ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(-1)} title='축소'>
        <em className='icon-minus' />
      </ToolboxButton>
    </ToolboxButtonWrapper>
  );
};
