import { PaintTypes } from 'app/stores/gas-layers/types';
import { CircleSize } from 'shared/constants/varibales';
import { create } from 'zustand';

interface ValveStylerStateTypes {
  paints: { [index: string]: PaintTypes };
  minzoomLevels: { [index: string]: number };
}

export const useValveStylerStore = create<ValveStylerStateTypes>()((set) => ({
  paints: {
    '2310': {
      'circle-color': '#ff3300',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2311': {
      'circle-color': '#ff8000',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2312': {
      'circle-color': '#ffbb00',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2313': {
      'circle-color': '#fff200',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2320': {
      'circle-color': '#62ff00',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2321': {
      'circle-color': '#00ffb3',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2322': {
      'circle-color': '#008cff',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2323': {
      'circle-color': '#0004ff',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2330': {
      'circle-color': '#8800ff',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2331': {
      'circle-color': '#ff00d4',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2332': {
      'circle-color': '#ff0073',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
    '2333': {
      'circle-color': '#ff00d4',
      'circle-radius': CircleSize,
      'circle-stroke-color': '#292929',
      'circle-stroke-width': 2,
    },
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
  const layerType = 'circle';
  const sourceLayer = 'gsf_vv_mt';
  return {
    id: `gsf_vv_mt_${key}`,
    type: layerType,
    paint,
    minzoom,
    source,
    'source-layer': sourceLayer,
    filter,
  };
};
