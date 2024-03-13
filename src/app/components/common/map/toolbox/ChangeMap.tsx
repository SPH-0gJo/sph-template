import React, { useEffect, useState } from 'react';
import { useMapLayerControllStore } from 'app/stores/map/mapLayerControll';
import { Map as AppMap } from 'maplibre-gl';
import { vWorldKey } from 'shared/constants/varibales';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';
import styled from 'styled-components';

interface ChangeMapData {
  appMap: AppMap | null;
}

interface ChangeMapProps {
  data: ChangeMapData;
}

interface MapLayerListProps {
  $visible: boolean;
}

interface MapLayerBtnProps {
  $currentMap: boolean;
}

const MapLayerList = styled.div<MapLayerListProps>`
  position: absolute;
  right: 2.625rem;
  display: flex;
  width: 2.5rem;
  padding: 0.125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background-color: var(--white);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  visibility: ${(props) => (props.$visible ? '' : 'hidden')};

  span {
    font-size: 0.625rem;
  }
`;

const MapLayerBtn = styled.button<MapLayerBtnProps>`
  display: flex;
  width: 2.5rem;
  padding: 0.25rem 0.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.375rem;
  border: 0;
  font-size: 1.5rem;
  color: var(--dark-text-disabled);

  &:hover {
    background-color: var(--light-secondary-a16);
  }

  background-color: ${(props) => (props.$currentMap ? 'black' : 'white')};
  color: ${(props) => (props.$currentMap ? 'white' : 'black')};
`;
export const ChangeMap = (props: ChangeMapProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { appMap } = props.data;
  const { currentStyle, setCurrentStyle } = useMapLayerControllStore();

  const changeLayer = (currentStyle: string) => {
    if (!appMap) return;

    ['Base', 'Hybrid', 'Satellite', 'gray', 'midnight'].forEach((layer) => {
      appMap.getSource(layer) && appMap.removeLayer(`${layer}-layer`) && appMap.removeSource(`${layer}`);
    });
    if (currentStyle === 'Origin') {
      return;
    }

    appMap.addSource(`${currentStyle}`, {
      type: 'raster',
      tiles: [`http://api.vworld.kr/req/wmts/1.0.0/${vWorldKey}/${currentStyle}/{z}/{y}/{x}.png`],
      tileSize: 256,
    });
    appMap.addLayer({
      id: `${currentStyle}-layer`,
      type: 'raster',
      source: `${currentStyle}`,
      minzoom: 0,
      maxzoom: 22,
    });
    appMap.moveLayer(
      `${currentStyle}-layer`,
      appMap.getLayersOrder()[appMap.getLayersOrder().indexOf('housenumber') + 1],
    );
  };

  useEffect(() => {
    if (!currentStyle) return;
    changeLayer(currentStyle);
  }, [currentStyle]);

  return (
    <ToolboxButtonWrapper>
      <ToolboxButton name='vWorld' onClick={() => setOpen(!open)}>
        <em className='icon-image-o' />
      </ToolboxButton>
      <MapLayerList $visible={open}>
        <MapLayerBtn name={'Origin'} $currentMap={currentStyle === 'Origin'} onClick={() => setCurrentStyle('Origin')}>
          <span>Origin</span>
        </MapLayerBtn>
        <MapLayerBtn name={'Base'} $currentMap={currentStyle === 'Base'} onClick={() => setCurrentStyle('Base')}>
          <span>Base</span>
        </MapLayerBtn>
        <MapLayerBtn name={'Hybrid'} $currentMap={currentStyle === 'Hybrid'} onClick={() => setCurrentStyle('Hybrid')}>
          <span>Hybrid</span>
        </MapLayerBtn>
        {/* <MapLayerBtn*/}
        {/*  name={'Satellite'}*/}
        {/*  $currentMap={currentStyle === 'Satellite'}*/}
        {/*  onClick={() => setCurrentStyle('Satellite')}*/}
        {/* >*/}
        {/*  <span>Satellite</span>*/}
        {/* </MapLayerBtn>*/}
        {/* <MapLayerBtn name={'gray'} $currentMap={currentStyle === 'gray'} onClick={() => setCurrentStyle('gray')}>*/}
        {/*  <span>gray</span>*/}
        {/* </MapLayerBtn>*/}
        <MapLayerBtn
          name={'midnight'}
          $currentMap={currentStyle === 'midnight'}
          onClick={() => setCurrentStyle('midnight')}
        >
          <span>midnight</span>
        </MapLayerBtn>
      </MapLayerList>
    </ToolboxButtonWrapper>
  );
};
