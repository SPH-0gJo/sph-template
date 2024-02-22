import { Feature, FeatureCollection, LineString } from 'geojson';
import { measureTypes } from 'shared/constants/types/types';
import { create } from 'zustand';

interface MapOptionState {
  measureType: measureTypes;
  measureSource: FeatureCollection;
  measureLayer: Feature<LineString>;
  measureValue: number;
  style: string;
  zoomLevel: number;
  setMeasureType: (measure: measureTypes) => void;
  setMeasureSource: (source: FeatureCollection | null) => void;
  setMeasureLayer: (layer: Feature<LineString> | null) => void;
  setMeasureValue: (value: number) => void;
  setStyleOption: (style: string) => void;
  setZoomLevel: (direction: number) => void;
}

export const useMapOptionsStore = create<MapOptionState>()((set, get) => ({
  measureType: 'none',
  measureSource: {
    type: 'FeatureCollection',
    features: [],
  },
  measureLayer: {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [] },
    properties: {},
  },
  measureValue: 0,
  style: 'https://api.maptiler.com/maps/streets/style.json?key=DifPnucmd6PF6UqDKcMm',
  zoomLevel: 6,
  setMeasureType: (measure: measureTypes) => {
    const current = get().measureType;
    const changed = current === measure ? 'none' : measure;
    set({ measureType: changed });
  },
  setMeasureValue: (measureValue) => set({ measureValue: measureValue }),
  setMeasureSource: (source) => {
    const init: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };

    if (source === null) set({ measureSource: init });
    else set({ measureSource: source });
  },
  setMeasureLayer: (layer) => {
    const init: Feature<LineString> = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [] },
      properties: {},
    };

    if (layer === null) set({ measureLayer: init });
    else set({ measureLayer: layer });
  },
  setStyleOption: (style: string) => set({ style }),
  setZoomLevel: (direction) => {
    const current = get().zoomLevel + direction;
    if (current === 22 || current < 1) return;
    set((state) => ({ zoomLevel: state.zoomLevel + direction }));
  },
}));
