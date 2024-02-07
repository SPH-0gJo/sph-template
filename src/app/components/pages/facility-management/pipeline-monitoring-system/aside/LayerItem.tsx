/* eslint-disable camelcase */
import React from 'react';
import { LayerGroupData } from 'shared/fixtures/layer.groups';
import { geo_data, GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

interface LayerItemProps {
  id: string;
}

const LayerItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  color: var(--dark-text-primary);
  border: 1px solid var(--light-surface-level-0);
  border-radius: 0.625rem;
  padding: 0.5rem 1rem 1.2rem 1rem;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  justify-content: space-between;
  & em {
    cursor: pointer;
  }
`;

const Layer = styled.div`
  display: flex;
  align-items: center;
  & label {
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.8rem;
`;

export const LayerItem = (props: LayerItemProps) => {
  const { id } = props;
  const layerList = LayerGroupData[id].layers;

  return (
    <LayerItemWrapper>
      <ItemHeader>
        <h5>{id.toUpperCase()}</h5>
        <em className="icon-close-large"></em>
      </ItemHeader>
      {layerList &&
        layerList.map(layer => {
          const key = layer.split('_')[1] as GeoDataKeys;
          const { name } = geo_data[key];

          return (
            <Layer key={`mn_layer_${layer}`}>
              <CheckBox id={layer} type='checkbox' />
              <label htmlFor={layer}>{name}</label>
            </Layer>
          )
        })
      }
    </LayerItemWrapper >
  )
};