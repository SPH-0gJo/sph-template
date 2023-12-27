import React from 'react';
import { ToolboxWrapper, ToolboxButton } from 'shared/styles/styled/common';
import { useMapOptionsStore } from 'app/stores/mapOptions';

export const ZoomButtons = () => {
  const { setZoomLevel } = useMapOptionsStore();
  return (
    <ToolboxWrapper>
      <ToolboxButton className='subtitle_sm' onClick={() => setZoomLevel(1)}>
        <em className='icon-plus' />
        <span>확대</span>
      </ToolboxButton>
      <ToolboxButton className='subtitle_sm' onClick={() => setZoomLevel(-1)}>
        <em className='icon-minus' />
        <span>축소</span>
      </ToolboxButton>
      <ToolboxButton className='subtitle_sm'>
        <em className='icon-earth-large-o' />
        <span>초기화</span>
      </ToolboxButton>
    </ToolboxWrapper>
  );
};
