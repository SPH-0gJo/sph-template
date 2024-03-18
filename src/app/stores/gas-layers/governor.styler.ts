import { StylerStateTypes } from 'app/stores/gas-layers/types';
import { create } from 'zustand';

export const useGovernorStylerStore = create<StylerStateTypes>()(() => ({
  paints: {
    '2111': {
      'circle-color': '#03cffc',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2112': {
      'circle-color': '#14fc03',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
  },
  layouts: {
    '2111': {
      'text-field': 'G',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2112': {
      'text-field': 'G',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  },
  minzoomLevels: {
    '2111': 12,
    '2112': 12,
  },
}));

/* eslint-disable */
export const generateGovernorLayerOption = (key: string, source: string) => {
  const { paints, layouts, minzoomLevels } = useGovernorStylerStore.getState();
  if (!layouts || !paints || !minzoomLevels) return;
  const layout = layouts[key];
  const paint = paints[key];
  const minzoom = minzoomLevels[key];
  const filter = ['==', 'RGLT_DIV_C', key];
  const sourceLayer = 'gsf_rglt_mt';
  return [
    {
      id: `gsf_rglt_mt_symbol_${key}`,
      type: 'symbol',
      layout,
      minzoom,
      source,
      'source-layer': sourceLayer,
      filter,
    },
    {
      id: `gsf_rglt_mt_${key}`,
      type: 'circle',
      paint,
      minzoom,
      source,
      'source-layer': sourceLayer,
      filter,
    },
  ];
};
