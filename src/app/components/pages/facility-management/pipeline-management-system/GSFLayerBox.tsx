import React, { useEffect, useMemo, useState } from 'react';
import { GSFLayerBoxContents } from 'app/components/pages/facility-management/pipeline-management-system/GSFLayerBoxContents';
import { GSFLayerStyleEditor } from 'app/components/pages/facility-management/pipeline-management-system/GSFLayerStyleEditor';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { Map as AppMap } from 'maplibre-gl';
import { GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

interface LayerBoxProps {
  visible: boolean;
}

const LayerBoxWrapper = styled.div<LayerBoxProps>`
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
  padding-bottom: ${(props) => (props.visible ? '0' : '1.87rem')};
`;
const LayerBoxHeader = styled.div<LayerBoxProps>`
  display: flex;
  padding: 0.9375rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.visible ? '0' : '1px solid var(--divider, rgba(0, 0, 0, 0.12))')};

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

interface GSFLayerBoxData {
  appMap: AppMap | null;
}

interface GSFLayerBoxProps {
  data: GSFLayerBoxData;
}

export const GSFLayerBox = (props: GSFLayerBoxProps) => {
  const [layerGroupId, setLayerGroupId] = useState<GeoDataKeys | undefined>();
  const [visible, setVisible] = useState(false);
  const { gsfLayerGroups, layerStyleEditorId } = useGsfLayerStore();
  useEffect(() => {
    setLayerGroupId('pl');
  }, []);

  const layerGroups = useMemo(() => {
    if (!gsfLayerGroups) return;
    return [
      { name: '배관', layerId: 'gsf_pl_mt', key: 'pl', icon: 'gas-pipe' },
      { name: '밸브', layerId: 'gsf_vv_mt', key: 'vv', icon: 'gas-valve' },
      { name: 'TB', layerId: 'gsf_tb_mt', key: 'tb', icon: 'gas-tb' },
      { name: '정압기', layerId: 'gsf_rglt_mt', key: 'rglt', icon: 'gas-gauge' },
    ];
  }, [gsfLayerGroups]);

  return (
    <>
      <LayerBoxWrapper visible={visible}>
        <LayerBoxHeader visible={visible}>
          <LayerGroupButtons>
            {layerGroups &&
              layerGroups.map((group) => {
                const { key, layerId, name, icon } = group;
                return (
                  <LayerGroupButton
                    className={layerGroupId === key ? 'selected' : ''}
                    key={layerId}
                    onClick={() => setLayerGroupId(key as GeoDataKeys)}
                  >
                    <em className={`icon-${icon}`} />
                    <span>{name}</span>
                  </LayerGroupButton>
                );
              })}
          </LayerGroupButtons>
          <em className={`icon-chevron-${visible ? 'left' : 'right'}-large`} onClick={() => setVisible(!visible)} />
        </LayerBoxHeader>
        {!visible && <GSFLayerBoxContents data={{ appMap: props.data.appMap, layerGroupId }} />}
      </LayerBoxWrapper>
      {layerStyleEditorId && <GSFLayerStyleEditor />}
    </>
  );
};
