import { LayoutTypes, PaintTypes } from 'app/stores/gas-layers/types';
import { create } from 'zustand';

interface TestboxStylerStoteTypes {
  minzoomLevels: { [index: string]: number };
  layouts: { [index: string]: LayoutTypes };
  paints: { [index: string]: PaintTypes };
}

export const useTestboxStylerStore = create<TestboxStylerStoteTypes>()(() => ({
  paints: {
    '2240': {
      'circle-color': '#6887FF',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2241': {
      'circle-color': '#ffc800',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2242': {
      'circle-color': '#5eff00',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2243': {
      'circle-color': '#00ffc3',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2244': {
      'circle-color': '#001eff',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2245': {
      'circle-color': '#d000ff',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2246': {
      'circle-color': '#ff0040',
      'circle-radius': 10,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
  },
  layouts: {
    '2240': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2241': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2242': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2243': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2244': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2245': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    '2246': {
      'text-field': 'TB',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  },
  minzoomLevels: {
    '2240': 12,
    '2241': 12,
    '2242': 12,
    '2243': 12,
    '2244': 12,
    '2245': 12,
    '2246': 12,
  },
}));

/* eslint-disable */
export const generateTestboxLayerOption = (key: string, source: string) => {
  const { paints, layouts, minzoomLevels } = useTestboxStylerStore.getState();
  const layout = layouts[key];
  const paint = paints[key];
  const minzoom = minzoomLevels[key];
  const filter = ['==', 'GIS_TB_TY_', key];
  const layerType = 'symbol';
  const sourceLayer = 'gsf_tb_mt';
  return [
    {
      id: `gsf_tb_mt_symbol_${key}`,
      type: layerType,
      layout,
      minzoom,
      source,
      'source-layer': sourceLayer,
      filter,
    },
    {
      id: `gsf_tb_mt_${key}`,
      type: 'circle',
      paint,
      minzoom,
      source,
      'source-layer': sourceLayer,
      filter,
    },
  ];
};
