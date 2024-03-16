import React, { useEffect, useMemo } from 'react';
import { GasLayer, GeoDataKeys, useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
// import { usePipelineStylerStore } from 'app/stores/pipeline.styler';
import { Map as AppMap } from 'maplibre-gl';
import styled from 'styled-components';

const LayerBoxContents = styled.ul`
  user-select: none;
  display: flex;
  padding: 0rem 0.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  li {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 2.375rem;
    padding: 0rem 0.375rem;
    align-items: center;
    gap: 0.375rem;
    border-radius: 0.625rem;
    background-color: var(--light-secondary-a8);
    &.selected {
      color: var(--white);
      background-color: var(--light-secondary-origin);
    }
    &:hover {
      color: var(--black);
      background-color: var(--light-secondary-a16);
    }
  }
`;

const LayerButtons = styled.div`
  height: 100%;
  margin-left: auto;
  display: flex;
  gap: 0.375rem;
  padding: 0.4rem 0rem;
`;

const LayerButton = styled.button`
  padding: 0.25rem 0.625rem;
  border-radius: 1.25rem;
  border: 1px solid var(--light-secondary-origin);
  background-color: var(--white);
  color: var(--light-secondary-origin);
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  &.selected {
    color: var(--white);
    background-color: var(--dark-surface-level-0);
  }
`;

interface GSFLayerBoxContentData {
  appMap: AppMap | null;
  layerGroupId: GeoDataKeys | undefined;
}

interface GSFLayerBoxContentProps {
  data: GSFLayerBoxContentData;
}

export const GasLayerBoxContents = (props: GSFLayerBoxContentProps) => {
  const { gasLayerGroups, layerStyleEditorId, setLayerStyleEditorId, upsertItem } = useGasLayerGroupStore();
  // const { layerGroup:\\ pipelineLayerGroup } = usePipelineStylerStore();
  const { appMap, layerGroupId } = props.data;

  const layerGroup = useMemo(() => {
    if (!gasLayerGroups || !layerGroupId) return [];
    const data: GasLayer[] = [];
    gasLayerGroups.forEach((layer) => {
      const { groupId } = layer;
      groupId === layerGroupId && data.push(layer);
    });
    return data;
  }, [gasLayerGroups, layerGroupId]);

  useEffect(() => {
    setLayerStyleEditorId(undefined);
  }, [layerGroupId]);

  return (
    <LayerBoxContents>
      {layerGroup.map((layer, index) => {
        return (
          <li
            className={`body_sm ${layer.hidden || 'selected'}`}
            key={index}
            onClick={() => {
              const { sourceLayerId } = layer;
              if (!appMap || !sourceLayerId) return;
              layer.hidden = !layer.hidden;
              upsertItem(layer);
              const visible = layer.hidden ? 'none' : 'visible';
              appMap.setLayoutProperty(sourceLayerId, 'visibility', visible);
            }}
          >
            <em className='icon-drag-line-horizontal' />
            <span>{layer.name}</span>
            <LayerButtons>
              <LayerButton
                className={layer.sourceLayerId === layerStyleEditorId ? 'selected' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  const { sourceLayerId } = layer;
                  setLayerStyleEditorId(sourceLayerId);
                }}
              >
                <em className='icon-pencil-o' />
                <span className='subtitle_sm'>스타일</span>
              </LayerButton>
            </LayerButtons>
          </li>
        );
      })}
    </LayerBoxContents>
  );
};
