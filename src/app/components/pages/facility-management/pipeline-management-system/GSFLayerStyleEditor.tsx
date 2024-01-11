import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { InputField } from 'app/components/common-ui';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { GeoDataKeys, LayerStyle } from 'shared/fixtures/pipeline';

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

  const selectedLayer = useMemo(() => {
    if (!layerStyleEditorId || !gsfLayerGroups) return;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    return layer;
  }, [layerStyleEditorId]);

  const selectedLayerStyle = useMemo(() => {
    if (!selectedLayer) return;
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

  function changeLineNSymbolStyle(key: string, value: string | number | number[]) {
    if (!selectedLayer) return;
    if (!layerStyleEditorId || !gsfLayerGroups) return;
    const layer = gsfLayerGroups.get(layerStyleEditorId);
    if (!layer || !layer.style || !value) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    layer.style[key as keyof LayerStyle] = value;
    upsertItem(layer);
  }
  const changeStyleProcessors = {
    pl: changeLineNSymbolStyle,
    vv: changeLineNSymbolStyle,
    tb: changeLineNSymbolStyle,
    rglt: changeLineNSymbolStyle,
  };

  function styleProcessor(key: keyof LayerStyle, value: string | number) {
    groupId && changeStyleProcessors[groupId](key, value);
  }

  return (
    <LayerStyleEditor>
      <LayerStyleEditForm>
        <InputField
          label={paintStyle?.sizeField}
          inputType='number'
          value={`${selectedLayerStyle?.[paintStyle?.sizeFieldId as keyof LayerStyle] || 0}`}
          setInputValue={(width) => styleProcessor(paintStyle?.sizeFieldId as keyof LayerStyle, Number(width))}
        />
        <InputField label='라인 스타일' setInputValue={(e) => console.log(e)} />
        <InputField
          label={paintStyle?.colorField}
          inputType='color'
          value={`${selectedLayerStyle?.[paintStyle?.colorFieldId as keyof LayerStyle] || ''}`}
          setInputValue={(color) => styleProcessor(paintStyle?.colorFieldId as keyof LayerStyle, String(color))}
        />
      </LayerStyleEditForm>
    </LayerStyleEditor>
  );
};
