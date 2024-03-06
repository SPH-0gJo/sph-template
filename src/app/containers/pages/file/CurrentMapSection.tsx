import React, { useEffect, useState } from 'react';
import { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const CurrentMapWrapper = styled.div`
  width: 100%;
  height: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const DefaultTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  border-bottom: 0.075rem solid var(--black-a8);
`;

interface ColorProps {
  $color: string;
}

const InputWrapper = styled.div<ColorProps>`
  display: flex;
  justify-content: start;
  align-items: center;

  label {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  &.main {
    label {
      margin: 0.5rem;
      width: 100%;
      background-repeat: no-repeat;
      background-position: left center;
      border-radius: 10px;
      cursor: pointer;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      font-family: 'Saira Semi Condensed', sans-serif;
      color: var(--white-a100);
      background-color: var(--black-a16);
    }

    input:checked + label {
      background-color: var(--dark-surface-level-2);
      opacity: 0.8;
    }

    input {
      display: none;
    }
  }

  &.sub {
    padding: 0 0 0.4rem 1rem;

    &.block {
      opacity: 0.2;
    }

    label {
      opacity: 0.2;
      background-color: ${(props) => props.$color};
      width: 100%;
      color: var(--white);
      border-radius: 0.625rem;
      padding: 0.25rem;
    }

    input:checked + label {
      background-color: ${(props) => props.$color};
      opacity: 0.8;
      color: var(--white);
    }

    input {
      color: var(--black-a4);
      display: none;
    }
  }
`;

const ListWrapper = styled.div`
  height: 100%;
  overflow: scroll;
  padding: 0 0.625rem 0;
`;

interface GeojsonUploadBox {
  map: AppMap | null;
  colorMap: Map<string, string>;
}

export const CurrentMapSection = (props: GeojsonUploadBox) => {
  const { map, colorMap } = props;
  const [layerList, setLayerList] = useState<string[]>([]);
  const [checkMap, setCheckMap] = useState<Map<string, string>>();
  const [mainFlag, setMainFlag] = useState<boolean>(true);

  useEffect(() => {
    if (colorMap) {
      const tempList: string[] = [];
      const tempMap = new Map<string, string>();
      Array.from(colorMap).map((data) => {
        tempList.push(data[0]);
        tempMap.set(data[0], 'visible');
      });
      setLayerList(tempList);
      setCheckMap(tempMap);
    }
  }, [colorMap]);

  const layerTrigger = (layer: string, visibility: string) => {
    if (!checkMap) return;
    map?.setLayoutProperty(layer, 'visibility', visibility);
  };

  const checkHandler = (layer: string, flag: boolean, type = 'single') => {
    const visibility = flag ? 'visible' : 'none';
    layerTrigger(layer, visibility);

    if (type === 'all') return;
    const tempMap = new Map(checkMap);
    tempMap.set(layer, visibility);
    setCheckMap(tempMap);
  };

  useEffect(() => {
    if (mainFlag) {
      if (checkMap) {
        Array.from(checkMap).map((layer) => {
          checkHandler(layer[0], layer[1] !== 'none');
        });
      }
    } else {
      layerList.map((layer) => {
        checkHandler(layer, false, 'all');
      });
    }
  }, [mainFlag]);

  return (
    <CurrentMapWrapper>
      <DefaultTitle>
        <h6>Default Map</h6>
      </DefaultTitle>
      <InputWrapper className={'main'} $color={'var(--black-a16)'}>
        <input type='checkbox' id='main_layer' defaultChecked={mainFlag} onChange={() => setMainFlag(!mainFlag)} />
        <label htmlFor='main_layer'>geolab_map</label>
      </InputWrapper>
      <ListWrapper>
        {layerList.map((layer, index) => (
          <InputWrapper key={index} className={`sub ${mainFlag ? '' : 'block'}`} $color={`${colorMap.get(layer)}`}>
            <input
              type='checkbox'
              id={`${index}_layer`}
              defaultChecked={true}
              onChange={(e) => checkHandler(layer, e.currentTarget.checked)}
            />
            <label htmlFor={`${index}_layer`}>
              <em className={checkMap?.get(layer) === 'visible' ? 'icon-check-circle' : 'icon-check-circle-o'} />
              &nbsp;{layer}
            </label>
          </InputWrapper>
        ))}
      </ListWrapper>
    </CurrentMapWrapper>
  );
};
