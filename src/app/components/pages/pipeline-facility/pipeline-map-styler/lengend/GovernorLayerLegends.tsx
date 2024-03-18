import React, { useMemo } from 'react';
import {
  LegendRows,
  TestboxNGovernorLegendSymbol,
} from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/gas.layer.styles';
import { useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
import { useGovernorStylerStore } from 'app/stores/gas-layers/governor.styler';
import { LayerGroups } from 'app/stores/gas-layers/layer.groups';

export const GovernorLayerLegends = () => {
  const { paints } = useGovernorStylerStore();
  const { gasLayerGroups } = useGasLayerGroupStore();

  const governorLegendStyle = useMemo(() => {
    if (!gasLayerGroups || !paints) return [];
    const { layers } = LayerGroups['rglt'];
    return layers.map((layer) => {
      const { code, name } = layer;
      const paint = paints[code];
      const circleColor = paint['circle-color'];
      return { name, styles: { circleColor } };
    });
  }, [gasLayerGroups, paints]);

  return (
    <LegendRows>
      {!governorLegendStyle ||
        governorLegendStyle.map((e, index) => {
          const { name, styles } = e;
          const { circleColor } = styles;
          return (
            <div className='caption' key={`governor_legend_style_${index}`}>
              <TestboxNGovernorLegendSymbol $color={circleColor}>G</TestboxNGovernorLegendSymbol>
              <span>{name}</span>
            </div>
          );
        })}
    </LegendRows>
  );
};
