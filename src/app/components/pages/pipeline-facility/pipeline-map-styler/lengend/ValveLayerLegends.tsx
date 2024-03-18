import React, { useMemo } from 'react';
import {
  LegendRows,
  StyledProps,
} from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/gas.layer.styles';
import { useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
import { LayerGroups } from 'app/stores/gas-layers/layer.groups';
import { useValveStylerStore } from 'app/stores/gas-layers/valve.styler';
import styled from 'styled-components';

const ValveLegendSymbol = styled.img<StyledProps>`
  color: ${(props) => props.$color};
  width: 0.9rem;
  height: 0.9rem;
  margin: 0 0.5rem 0 0;
  transform: translateY(-0.9rem);
  filter: drop-shadow(0 0.9rem 0);
`;

export const ValveLayerLegends = () => {
  const { paints } = useValveStylerStore();
  const { gasLayerGroups } = useGasLayerGroupStore();

  const valveLegendStyle = useMemo(() => {
    if (!gasLayerGroups || !paints) return [];
    const { layers } = LayerGroups['vv'];
    return layers.map((layer) => {
      const { code, name } = layer;
      const paint = paints[code];
      const circleColor = paint['icon-color'];
      return { name, styles: { circleColor } };
    });
  }, [gasLayerGroups, paints]);

  return (
    <LegendRows>
      {!valveLegendStyle ||
        valveLegendStyle.map((e, index) => {
          const { name, styles } = e;
          const { circleColor } = styles;
          return (
            <div className='caption' key={`valve_legend_style_${index}`}>
              <ValveLegendSymbol src='/assets/images/valve.png' $color={circleColor} alt='valve icon' />
              <span>{name}</span>
            </div>
          );
        })}
    </LegendRows>
  );
};
