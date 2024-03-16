import React, { useEffect, useMemo } from 'react';
import { InputField, Select } from 'app/components/common-ui';
import { useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
import { LayerGroups } from 'app/stores/gas-layers/layer.groups';
import { usePipelineStylerStore } from 'app/stores/gas-layers/pipeline.styler';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { Map as AppMap } from 'maplibre-gl';
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

interface PipelineLayerStyleEditorData {
  appMap: AppMap | null;
}

interface PipelineLayerStyleEditorProps {
  data: PipelineLayerStyleEditorData;
}

export const PipelineLayerStyleEditor = (props: PipelineLayerStyleEditorProps) => {
  const { appMap } = props.data;
  const { layerStyleEditorId } = useGasLayerGroupStore();
  const { paints, minzoomLevels, setZoomLevel, setLineWidthOfPaint, setLineDashOfPaint, setLineColorOfPaint } =
    usePipelineStylerStore();

  const layerId = useMemo(() => {
    return layerStyleEditorId?.split('_').at(-1);
  }, [layerStyleEditorId]);

  const pipelineStyles = useMemo(() => {
    const paint = paints[layerId as keyof typeof paints];
    const minzoomLevel = minzoomLevels[layerId as keyof typeof minzoomLevels];
    const color = paint['line-color'];
    const width = paint['line-width'];
    const dashed = paint['line-dasharray'] ?? false;
    return { color, width, dashed, minzoomLevel };
  }, [layerStyleEditorId, paints, minzoomLevels]);

  useEffect(() => {
    console.log(pipelineStyles);
    if (!appMap || !layerStyleEditorId) return;
    const { color, width, dashed, minzoomLevel } = pipelineStyles;
    appMap.setPaintProperty(layerStyleEditorId, 'line-color', color);
    appMap.setPaintProperty(layerStyleEditorId, 'line-width', width);
    dashed && appMap.setPaintProperty(layerStyleEditorId, 'line-dasharray', [2, 2]);
    !dashed && appMap.setPaintProperty(layerStyleEditorId, 'line-dasharray', null);
    appMap.setLayerZoomRange(layerStyleEditorId, minzoomLevel, 24);
  }, [pipelineStyles]);

  return (
    <LayerStyleEditor>
      <LayerStyleEditForm>
        <InputField
          label='zoomlevel'
          inputType='number'
          value={pipelineStyles.minzoomLevel}
          setInputValue={(zoomLevel) => setZoomLevel({ zoomLevelId: String(layerId), zoomLevel: Number(zoomLevel) })}
          min={7}
          max={22}
        />
        <InputField
          label='라인두께'
          inputType='number'
          value={pipelineStyles.width}
          setInputValue={(width) => setLineWidthOfPaint({ paintId: String(layerId), width })}
        />
        <Select
          label='라인 스타일'
          optionData={pipelineStrokeStyleOptions}
          defaultKey={pipelineStyles.dashed ? '2' : '1'}
          onChange={(lineStyle) => {
            setLineDashOfPaint({ paintId: String(layerId), dashed: lineStyle === 'true' });
          }}
        />
        <InputField
          label='라인 색상'
          inputType='color'
          value={pipelineStyles.color}
          setInputValue={(color) => {
            setLineColorOfPaint({ paintId: String(layerId), color: String(color) });
          }}
        />
      </LayerStyleEditForm>
    </LayerStyleEditor>
  );
};
