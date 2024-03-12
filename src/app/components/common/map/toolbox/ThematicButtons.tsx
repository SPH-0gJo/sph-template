import React from 'react';
import { useNaverRoadViewStore } from 'app/stores/map/naverRoadView';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';

export const ThematicButtons = () => {
  const { naverRoadViewMap, setNaverRoadViewMap } = useNaverRoadViewStore();
  return (
    <>
      <ToolboxButtonWrapper>
        <ToolboxButton name='주제도'>
          <em className='icon-layers' />
        </ToolboxButton>
        <ToolboxButton name='거리뷰' className={`${naverRoadViewMap ? 'selected' : ''}`} onClick={setNaverRoadViewMap}>
          <em className='icon-map-street' />
        </ToolboxButton>
      </ToolboxButtonWrapper>
    </>
  );
};
