import React, { useEffect } from 'react';
import { GeolabNaverRoadView } from 'app/components/common/map/GeolabNaverRoadView';
import { useNaverRoadViewStore } from 'app/stores/map/naverRoadView';
import { Map as AppMap, MapMouseEvent } from 'maplibre-gl';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';
import styled from 'styled-components';

const NaverRoadViewModal = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
`;

const NaverRoadViewModalBackdrop = styled.div`
  z-index: -1;
  position: fixed;
  inset: 0px;
  background-color: var(--black-a48);
  -webkit-tap-highlight-color: transparent;
`;

interface ThematicButtonData {
  appMap: AppMap | null;
}

interface ThematicButtonProps {
  data: ThematicButtonData;
}

export const ThematicButtons = (props: ThematicButtonProps) => {
  const { appMap } = props.data;
  const { naverRoadViewMap, naverRoadViewCoords, setNaverRoadViewMap, setNaverRoadViewCoords } =
    useNaverRoadViewStore();

  useEffect(() => {
    if (!appMap) return;
    const style = appMap.getCanvas().style;
    style.cursor = naverRoadViewMap ? 'crosshair' : 'default';
    if (naverRoadViewMap) {
      appMap.on('click', handler);
    } else appMap.off('click', handler);
  }, [naverRoadViewMap]);

  const handler = (e: MapMouseEvent) => {
    if (!appMap) return;
    const { lng, lat } = e.lngLat;
    setNaverRoadViewCoords({ lng, lat });
  };

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
      {!naverRoadViewMap || (
        <NaverRoadViewModal
          className={`${naverRoadViewCoords ? 'visible' : ''}`}
          onClick={(e) => {
            const elementId = (e.target as HTMLDivElement).id;
            if (elementId === 'modal_back_drop') setNaverRoadViewMap();
          }}
        >
          <NaverRoadViewModalBackdrop id='modal_back_drop' />
          <GeolabNaverRoadView />
        </NaverRoadViewModal>
      )}
    </>
  );
};
