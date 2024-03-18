import React, { useMemo } from 'react';
import {
  LegendRows,
  StyledProps,
} from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/gas.layer.styles';
import { useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
import { LayerGroups } from 'app/stores/gas-layers/layer.groups';
import { usePipelineStylerStore } from 'app/stores/gas-layers/pipeline.styler';
import styled from 'styled-components';

const PipelineLegendSymbol = styled.hr<StyledProps>`
  width: 3rem;
  height: ${(props) => props.$height};
  background-color: transparent;
  border-top: ${(props) => props.$borderTopStyle};
  margin: 0 0.5rem 0 0;
`;

export const PipelineLayerLegends = () => {
  const { paints } = usePipelineStylerStore();
  const { gasLayerGroups } = useGasLayerGroupStore();

  const pipelineLegendStyle = useMemo(() => {
    if (!gasLayerGroups || !paints) return [];
    const { layers } = LayerGroups['pl'];
    return layers.map((layer) => {
      const { code, name } = layer;
      const paint = paints[code];
      const color = paint['line-color'];
      const width = paint['line-width'];
      const dashed = paint['line-dasharray'] ?? false;
      return { name, styles: { color, width, dashed } };
    });
  }, [gasLayerGroups, paints]);

  return (
    <LegendRows>
      {!pipelineLegendStyle ||
        pipelineLegendStyle.map((e, index) => {
          const { name, styles } = e;
          const { color, width, dashed } = styles;
          const borderWidth = width ? `${Number(width) / 10}rem` : '0.3rem';
          const borderColor = color || '#ffffff';
          const borderStyle = dashed ? 'dashed' : 'solid';
          const borderTopStyle = `${borderWidth} ${borderColor} ${borderStyle}`;
          return (
            <div className='caption' key={`pipeline_legend_style_${index}`}>
              <PipelineLegendSymbol $borderTopStyle={borderTopStyle} $height={borderWidth} />
              <span>{name}</span>
            </div>
          );
        })}
    </LegendRows>
  );
};
