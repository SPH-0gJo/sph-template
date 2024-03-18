import React, { useMemo } from 'react';
import {
  LegendRows,
  TestboxNGovernorLegendSymbol,
} from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/gas.layer.styles';
import { useGasLayerGroupStore } from 'app/stores/gas-layers/gas.layer.groups';
import { LayerGroups } from 'app/stores/gas-layers/layer.groups';
import { useTestboxStylerStore } from 'app/stores/gas-layers/testbox.styler';

export const TestboxLayerLegends = () => {
  const { paints } = useTestboxStylerStore();
  const { gasLayerGroups } = useGasLayerGroupStore();

  const testboxLegendStyle = useMemo(() => {
    if (!gasLayerGroups || !paints) return [];
    const { layers } = LayerGroups['tb'];
    return layers.map((layer) => {
      const { code, name } = layer;
      const paint = paints[code];
      const circleColor = paint['circle-color'];
      return { name, styles: { circleColor } };
    });
  }, [gasLayerGroups, paints]);

  return (
    <LegendRows>
      {!testboxLegendStyle ||
        testboxLegendStyle.map((e, index) => {
          const { name, styles } = e;
          const { circleColor } = styles;
          return (
            <div className='caption' key={`testbox_legend_style_${index}`}>
              <TestboxNGovernorLegendSymbol $color={circleColor}>TB</TestboxNGovernorLegendSymbol>
              <span>{name}</span>
            </div>
          );
        })}
    </LegendRows>
  );
};
