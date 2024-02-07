/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useLayerGroupStore } from 'app/stores/layerGroup';
import { LayerGroupData, LayerGroupKeys } from 'shared/fixtures/layer.groups';
import { geo_data, GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

interface LayerItemProps {
  id: LayerGroupKeys;
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

const ItemTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & input[type=checkbox] {
        width: 1.1rem;
        height: 1.1rem;
    }

    & label {
        cursor: pointer;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.8;
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
  const [allCheck, setAllCheck] = useState(true);
  const { layerIdList, setLayerIdList, layerGroupsList, setLayerGroupsList } = useLayerGroupStore();

  const allCheckChange = () => {
    let tempList = [...layerGroupsList];
    layerIdList.forEach(id => {
      LayerGroupData[id].layers.forEach(layer => {
        if (!allCheck && !layerGroupsList.includes(layer)) tempList.push(layer);
        else tempList = tempList.filter(temp => temp !== layer);
      });
    });
    setAllCheck(!allCheck);
    setLayerGroupsList(tempList);
  };

  const deleteItemClick = () => {
    const tempList = layerIdList.filter(value => value !== id);
    setLayerIdList(tempList);
  };

  const LayerDivList = layerList.map(layer => {
    const key = layer.split('_')[1] as GeoDataKeys;
    const { name } = geo_data[key];

    const layerClick = () => {
      let tempList = [...layerGroupsList];
      if (!layerGroupsList.includes(layer)) tempList.push(layer);
      else tempList = layerGroupsList.filter(value => value !== layer);
      setLayerGroupsList(tempList);
    };

    return (
      <Layer key={`mn_layer_${layer}`}>
        <CheckBox
          id={layer} type="checkbox"
          checked={layerGroupsList.includes(layer)}
          onChange={layerClick}
        />
        <label htmlFor={layer}>{name}</label>
      </Layer>
    );
  });

  return (
    <LayerItemWrapper>
      <ItemHeader>
        <ItemTitle>
          <CheckBox
            id={`title_${id}`} type="checkbox"
            checked={allCheck}
            onChange={allCheckChange}
          />
          <label htmlFor={`title_${id}`}>{id.toUpperCase()}</label>
        </ItemTitle>
        <em className="icon-close-large" onClick={deleteItemClick}></em>
      </ItemHeader>
      {LayerDivList}
    </LayerItemWrapper>
  );
};