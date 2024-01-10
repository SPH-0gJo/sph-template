import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GeoDataKeys, GsfLayer } from 'shared/fixtures/pipeline';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { Map as AppMap } from 'maplibre-gl';

const LayerBoxWrapper = styled.div`
  display: flex;
  width: 25.625rem;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.9375rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 7.25rem;
  left: 1.25rem;
  user-select: none;
  padding-bottom: 1.87rem;
`;

const LayerBoxHeader = styled.div`
  display: flex;
  padding: 0.9375rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--divider, rgba(0, 0, 0, 0.12));
  em {
    margin-left: auto;
    font-size: 1.5rem;
    transform: rotate(-90deg);
    cursor: pointer;
  }
`;

const LayerGroupButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LayerGroupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  color: var(--black);
  font-size: 0.875rem;
  font-weight: var(--text-weight-bold);
  border: 0;
  border-radius: 0.375rem;
  background-color: var(--white);
  em {
    font-size: 1.125rem;
  }
  &.selected {
    color: var(--white);
    background-color: var(--light-secondary-origin);
  }
  &:hover {
    color: var(--black);
    background: var(--light-secondary-a16);
  }
`;

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
`;

interface GSFLayerBoxData {
  appMap: AppMap | null;
}

interface GSFLayerBoxProps {
  data: GSFLayerBoxData;
}

export const GSFLayerBox = (props: GSFLayerBoxProps) => {
  const [layerGroupId, setLayerGroupId] = useState<GeoDataKeys | undefined>();
  const { gsfLayerGroups, upsertItem } = useGsfLayerStore();
  useEffect(() => {
    setLayerGroupId('pl');
  }, []);

  const layerGroups = useMemo(() => {
    if (!gsfLayerGroups) return;
    return [
      { name: '배관', layerId: 'gsf_pl_mt', key: 'pl' },
      { name: '밸브', layerId: 'gsf_vv_mt', key: 'vv' },
      { name: 'TB', layerId: 'gsf_tb_mt', key: 'tb' },
      { name: '정압기', layerId: 'gsf_rglt_mt', key: 'rglt' },
    ];
  }, [gsfLayerGroups]);

  const layerGroup: GsfLayer[] = useMemo(() => {
    if (!gsfLayerGroups || !layerGroupId) return [];
    const data: GsfLayer[] = [];
    gsfLayerGroups.forEach((gsfLayer) => {
      const { groupId } = gsfLayer;
      groupId === layerGroupId && data.push(gsfLayer);
    });
    return data;
  }, [gsfLayerGroups, layerGroupId]);

  return (
    <LayerBoxWrapper>
      <LayerBoxHeader>
        <LayerGroupButtons>
          {layerGroups &&
            layerGroups.map((group) => {
              const { key, layerId, name } = group;
              return (
                <LayerGroupButton
                  className={layerGroupId === key ? 'selected' : ''}
                  key={layerId}
                  onClick={() => setLayerGroupId(key as GeoDataKeys)}
                >
                  <em className='icon-wrench-o' />
                  <span>{name}</span>
                </LayerGroupButton>
              );
            })}
        </LayerGroupButtons>
        <em className='icon-chevron-right-large' />
      </LayerBoxHeader>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('속성 >>>', e);
                  }}
                >
                  <em className='icon-format-list-group' />
                  <span className='subtitle_sm'>속성</span>
                </LayerButton>
                <LayerButton
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('스타일 >>>', e);
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
    </LayerBoxWrapper>
  );
};
