import React, { useEffect, useMemo } from 'react';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { Map as AppMap } from 'maplibre-gl';
import { GeoDataKeys, GsfLayer } from 'shared/fixtures/pipeline';
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

export const GSFLayerBoxContents = (props: GSFLayerBoxContentProps) => {
  const {
    gsfLayerGroups,
    layerDataTableId,
    layerStyleEditorId,
    setLayerDataTableId,
    setLayerStyleEditorId,
    upsertItem,
  } = useGsfLayerStore();
  const { layerGroupId } = props.data;

  const layerGroup: GsfLayer[] = useMemo(() => {
    if (!gsfLayerGroups || !layerGroupId) return [];
    const data: GsfLayer[] = [];
    gsfLayerGroups.forEach((gsfLayer) => {
      const { groupId } = gsfLayer;
      groupId === layerGroupId && data.push(gsfLayer);
    });
    return data;
  }, [gsfLayerGroups, layerGroupId]);

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
              if (!props.data.appMap || !sourceLayerId) return;
              layer.hidden = !layer.hidden;
              upsertItem(layer);
              const visible = layer.hidden ? 'none' : 'visible';
              props.data.appMap?.setLayoutProperty(sourceLayerId, 'visibility', visible);
            }}
          >
            <em className='icon-drag-line-horizontal' />
            <span>{layer.name}</span>
            <LayerButtons>
              <LayerButton
                className={layer.sourceLayerId === layerDataTableId ? 'selected' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  const { sourceLayerId } = layer;
                  setLayerDataTableId(sourceLayerId);
                }}
              >
                <em className='icon-format-list-group' />
                <span className='subtitle_sm'>속성</span>
              </LayerButton>
              <LayerButton
                className={layer.sourceLayerId === layerStyleEditorId ? 'selected' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  const { style, sourceLayerId } = layer;
                  if (!style || !sourceLayerId) return;
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
