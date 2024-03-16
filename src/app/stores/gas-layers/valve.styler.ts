import { PaintTypes } from 'app/stores/gas-layers/types';
import { create } from 'zustand';

interface ValveStylerStateTypes {
  paints: { [index: string]: PaintTypes };
  minzoomLevels: { [index: string]: number };
}

export const useValveStylerStore = create<ValveStylerStateTypes>()(() => ({
  paints: {
    '2310': { 'icon-color': '#ff3300' },
    '2311': { 'icon-color': '#ff8000' },
    '2312': { 'icon-color': '#ffbb00' },
    '2313': { 'icon-color': '#fff200' },
    '2320': { 'icon-color': '#62ff00' },
    '2321': { 'icon-color': '#00ffb3' },
    '2322': { 'icon-color': '#008cff' },
    '2323': { 'icon-color': '#0004ff' },
    '2330': { 'icon-color': '#8800ff' },
    '2331': { 'icon-color': '#ff00d4' },
    '2332': { 'icon-color': '#ff0073' },
    '2333': { 'icon-color': '#ff00d4' },
  },
  minzoomLevels: {
    '2310': 7,
    '2311': 7,
    '2312': 7,
    '2313': 7,
    '2320': 7,
    '2321': 7,
    '2322': 7,
    '2323': 7,
    '2330': 7,
    '2331': 7,
    '2332': 7,
    '2333': 7,
  },
}));

/* eslint-disable */
export const generateValveLayerOption = (key: string, source: string) => {
  const { paints, minzoomLevels } = useValveStylerStore.getState();
  const paint = paints[key];
  const minzoom = minzoomLevels[key];
  const filter = ['==', 'GIS_VV_TYP', key];
  const sourceLayer = 'gsf_vv_mt';
  return {
    id: `gsf_vv_mt_${key}`,
    type: 'symbol',
    layout: {
      'icon-image': 'valve-icon',
      'icon-size': 0.7,
      'icon-rotate': ['get', 'DRTN_ANGL'],
      'icon-allow-overlap': true,
    },
    paint,
    minzoom,
    source,
    'source-layer': sourceLayer,
    filter,
  };
};
