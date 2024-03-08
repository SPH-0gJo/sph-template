import React, { useEffect, useMemo, useState } from 'react';
import { InputField, Select } from 'app/components/common-ui';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { LayerStyleProperty } from 'shared/constants/types/types';
import { GeoDataKeys, LayerStyle, pipelineStrokeStyleOptions } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

const LayerStyleEditor = styled.div`
  width: 12.4375rem;
  padding: 0.625rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 11.25rem;
  left: 27.73rem;
`;

const LayerStyleEditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
  color: #000;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: -0.0075rem;
  input {
    margin-left: auto;
  }
`;

export const GSFLayerStyleEditor = () => {
  const { gsfLayerGroups, layerStyleEditorId, upsertItem } = useGsfLayerStore();
  const [groupId, setGroupId] = useState<GeoDataKeys>();
  const [lineStrokeStyle, setLineStrokeStyle] = useState<string | undefined>(undefined);

  const selectedLayer = useMemo(() => {
    if (!layerStyleEditorId || !gsfLayerGroups) return undefined;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    return layer;
  }, [layerStyleEditorId]);

  const selectedLayerStyle = useMemo(() => {
    if (!selectedLayer) return undefined;
    return selectedLayer?.style;
  }, [selectedLayer]);

  const paintStyle = useMemo(() => {
    if (!groupId) return;
    const lineLayer = groupId === 'pl';
    const sizeField = lineLayer ? '라인 두께' : '사이즈';
    const sizeFieldId = lineLayer ? 'line-width' : 'circle-radius';
    const colorField = lineLayer ? '색상' : '색상';
    const colorFieldId = lineLayer ? 'line-color' : 'circle-color';
    return { sizeField, sizeFieldId, colorField, colorFieldId };
  }, [groupId]);

  useEffect(() => {
    selectedLayer && setGroupId(selectedLayer?.groupId);
  }, [selectedLayer]);

  useEffect(() => {
    if (groupId !== 'pl') return;
    const strokeStyle = selectedLayerStyle?.['line-dasharray'];
    if (!strokeStyle) setLineStrokeStyle('1');
    else {
      const optionKey = strokeStyle[0] === 2.5 ? '2' : '3';
      setLineStrokeStyle(optionKey);
    }
  }, [groupId, selectedLayerStyle]);

  function changeLineNSymbolStyle(key: string, value: LayerStyleProperty) {
    if (!selectedLayer || !layerStyleEditorId || !gsfLayerGroups) return;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    if (!layer || !layer.style) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    layer.style[key as keyof LayerStyle] = value;
    upsertItem(layer);
  }

  return (
    <LayerStyleEditor>
      <LayerStyleEditForm>
        <InputField
          label={paintStyle?.sizeField}
          inputType='number'
          value={`${selectedLayerStyle?.[paintStyle?.sizeFieldId as keyof LayerStyle] || 0}`}
          setInputValue={(width) => changeLineNSymbolStyle(paintStyle?.sizeFieldId as keyof LayerStyle, Number(width))}
        />
        {groupId === 'pl' && (
          <Select
            label='라인 스타일'
            optionData={pipelineStrokeStyleOptions}
            defaultKey={lineStrokeStyle}
            onChange={(strokeStyle) => {
              changeLineNSymbolStyle('line-dasharray', strokeStyle);
            }}
          />
        )}
        <InputField
          label={paintStyle?.colorField}
          inputType='color'
          value={`${selectedLayerStyle?.[paintStyle?.colorFieldId as keyof LayerStyle] || ''}`}
          setInputValue={(color) => changeLineNSymbolStyle(paintStyle?.colorFieldId as keyof LayerStyle, String(color))}
        />
      </LayerStyleEditForm>
    </LayerStyleEditor>
  );
};
