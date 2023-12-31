import React from 'react';
import styled from 'styled-components';

import { ToolboxWrapper, ToolboxButton } from 'shared/styles/styled/common';
import { BaseMapButtons } from 'app/components/common/map/toolbox/BaseMapButtons';
import { MeasureButtons } from 'app/components/common/map/toolbox/MeasureButtons';
import { ZoomButtons } from 'app/components/common/map/toolbox/ZoomButtons';

const ToolboxContainer = styled.div`
  height: 50rem;
  position: fixed;
  right: 1rem;
  top: 6.525rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  user-select: none;
`;

export const MapToolbox = () => {
  return (
    <ToolboxContainer>
      <BaseMapButtons />
      <ToolboxWrapper>
        <ToolboxButton className='subtitle_sm'>
          <em className='icon-layers' />
          <span>주제도</span>
        </ToolboxButton>
        <ToolboxButton className='subtitle_sm'>
          <em className='icon-map-marker' />
          <span>거리뷰</span>
        </ToolboxButton>
      </ToolboxWrapper>
      <MeasureButtons />
      <ZoomButtons />
    </ToolboxContainer>
  );
};
