import React from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';

export const ZoomButtons = () => {
  const { setZoomLevel } = useMapOptionsStore();
  return (
    <ToolboxButtonWrapper>
      <ToolboxButton title='초기화'>
        <em className='icon-map-position' />
      </ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(1)} title='확대'>
        <em className='icon-plus' />
      </ToolboxButton>
      <ToolboxButton onClick={() => setZoomLevel(-1)} title='축소'>
        <em className='icon-minus' />
      </ToolboxButton>
    </ToolboxButtonWrapper>
  );
};
