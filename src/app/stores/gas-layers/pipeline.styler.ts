import { LayoutTypes, PaintTypes } from 'app/stores/gas-layers/types';
import { create } from 'zustand';

interface PipelineStylerStateTypes {
  paints: { [index: string]: PaintTypes };
  minzoomLevels: { [index: string]: number };
  layout: LayoutTypes;
  setZoomLevel: ({ zoomLevelId, zoomLevel }: { [index: string]: string | number }) => void;
  setLineWidthOfPaint: ({ paintId, width }: { [index: string]: string | number }) => void;
  setLineDashOfPaint: ({ paintId, dashed }: { [index: string]: string | boolean }) => void;
  setLineColorOfPaint: ({ paintId, color }: { [index: string]: string | boolean }) => void;
}

export const usePipelineStylerStore = create<PipelineStylerStateTypes>()((set) => ({
  paints: {
    '2010': { 'line-color': '#fc03e3', 'line-width': 3 },
    '2011': { 'line-color': '#fc03e3', 'line-width': 2 },
    '2012': { 'line-color': '#fc03e3', 'line-width': 2 },
    '2013': { 'line-color': '#fc03e3', 'line-width': 1, 'line-dasharray': [2, 2] },
    '2020': { 'line-color': '#ff000d', 'line-width': 3 },
    '2021': { 'line-color': '#ff000d', 'line-width': 2 },
    '2022': { 'line-color': '#ff000d', 'line-width': 1 },
    '2023': { 'line-color': '#ff000d', 'line-width': 1, 'line-dasharray': [2, 2] },
    '2030': { 'line-color': '#0037ff', 'line-width': 3 },
    '2031': { 'line-color': '#0037ff', 'line-width': 2 },
    '2032': { 'line-color': '#0037ff', 'line-width': 1 },
    '2033': { 'line-color': '#0037ff', 'line-width': 1, 'line-dasharray': [2, 2] },
  },
  minzoomLevels: {
    '2010': 7,
    '2011': 7,
    '2012': 7,
    '2013': 7,
    '2020': 7,
    '2021': 7,
    '2022': 7,
    '2023': 7,
    '2030': 7,
    '2031': 7,
    '2032': 7,
    '2033': 7,
  },
  layout: { 'line-join': 'round', 'line-cap': 'round' },
  setZoomLevel: ({ zoomLevelId, zoomLevel }) => {
    const zoomCheck = Number(zoomLevel) < 22 && Number(zoomLevel) > 7;
    zoomCheck && set((state) => ({ minzoomLevels: { ...state.minzoomLevels, [zoomLevelId]: Number(zoomLevel) } }));
  },
  setLineWidthOfPaint: ({ paintId, width }) => {
    set((state) => {
      const paint = state.paints[paintId];
      paint['line-width'] = Number(width);
      return { paints: { ...state.paints, [paintId]: paint } };
    });
  },
  setLineDashOfPaint: ({ paintId, dashed }) => {
    set((state) => {
      const id = String(paintId);
      const paint = state.paints[id];
      if (dashed) paint['line-dasharray'] = [2, 2];
      else delete paint['line-dasharray'];
      return { paints: { ...state.paints, [id]: paint } };
    });
  },
  setLineColorOfPaint: ({ paintId, color }) => {
    set((state) => {
      const id = String(paintId);
      const paint = state.paints[id];
      paint['line-color'] = String(color);
      return { paints: { ...state.paints, [id]: paint } };
    });
  },
}));

/* eslint-disable */
export const generatePipelineLayerOption = (key: string, source: string) => {
  const { paints, minzoomLevels, layout } = usePipelineStylerStore.getState();
  const paint = paints[key];
  const minzoom = minzoomLevels[key];
  const filter = ['==', 'GIS_PL_TY_', key];
  const layerType = 'line';
  const sourceLayer = 'gsf_pl_mt';
  return {
    id: `gsf_pl_mt_${key}`,
    type: layerType,
    paint,
    minzoom,
    source,
    'source-layer': sourceLayer,
    layout,
    filter,
  };
};
