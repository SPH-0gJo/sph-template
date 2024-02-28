import React, { useEffect, useState } from 'react';
import { Map as AppMap } from 'maplibre-gl';
import { pipelines, rglt, tbs, valves } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

const CurrentMapWrapper = styled.div`
  width: 100%;
  height: 11rem;
  background-color: white;
  display: flex;
  flex-direction: column;

  h6 {
    align-self: center;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  label {
    display: flex;
    justify-content: space-between;
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
    padding: 0 0 0.2rem 1rem;

    &.block {
      opacity: 0.2;
    }

    label {
      color: var(--black-a24);
    }

    input:checked + label {
      opacity: 0.8;
      color: var(--black);
    }

    input {
      color: var(--black-a4);
      display: none;
    }
  }
`;

interface GeojsonUploadBox {
  map: AppMap | null;
}

export const CurrentMapSection = (props: GeojsonUploadBox) => {
  const { map } = props;
  const LayerList = ['gas-pipe', 'gas-valve', 'gas-tb', 'gas-gauge'];
  const [checkMap, setCheckMap] = useState<Map<string, string>>();
  const [mainFlag, setMainFlag] = useState<boolean>(true);

  useEffect(() => {
    const tempMap = new Map<string, string>();
    tempMap.set('gas-pipe', 'visible');
    tempMap.set('gas-valve', 'visible');
    tempMap.set('gas-tb', 'visible');
    tempMap.set('gas-gauge', 'visible');
    setCheckMap(tempMap);
  }, []);

  const layerTrigger = (layer: string, visibility: string) => {
    if (!checkMap) return;

    switch (layer) {
      case 'gas-pipe':
        pipelines.map((val) => {
          map?.setLayoutProperty(`gsf_pl_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-valve':
        valves.map((val) => {
          map?.setLayoutProperty(`gsf_vv_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-tb':
        tbs.map((val) => {
          map?.setLayoutProperty(`gsf_tb_mt_${val.code}`, 'visibility', visibility);
        });
        break;
      case 'gas-gauge':
        rglt.map((val) => {
          map?.setLayoutProperty(`gsf_rglt_mt_${val.code}`, 'visibility', visibility);
        });
        break;
    }
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
      LayerList.map((layer) => {
        checkHandler(layer, false, 'all');
      });
    }
  }, [mainFlag]);

  return (
    <CurrentMapWrapper>
      <h6>Default Map</h6>
      <InputWrapper className={'main'}>
        <input type='checkbox' id='main_layer' defaultChecked={mainFlag} onChange={() => setMainFlag(!mainFlag)} />
        <label htmlFor='main_layer'>
          geolab_map<span>{mainFlag ? 'on' : 'off'}</span>
        </label>
      </InputWrapper>
      {LayerList.map((layer, index) => (
        <InputWrapper key={index} className={`sub ${mainFlag ? '' : 'block'}`}>
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
    </CurrentMapWrapper>
  );
};
