import { measureTypes } from 'shared/constants/types/types';
import { create } from 'zustand';

interface MapOptionState {
  measureType: measureTypes;
  measuredValue: string | number;
  style: string;
  zoomLevel: number;
  setMeasureType: (measure: measureTypes) => void;
  setStyleOption: (style: string) => void;
  setZoomLevel: (direction: number) => void;
  setMeasuredValue: (value: string) => void;
}

export const useMapOptionsStore = create<MapOptionState>()((set, get) => ({
  measureType: 'none',
  measuredValue: 0,
  style: 'https://api.maptiler.com/maps/streets/style.json?key=DifPnucmd6PF6UqDKcMm',
  zoomLevel: 6,
  setMeasureType: (measure: measureTypes) => {
    const current = get().measureType;
    const changed = current === measure ? 'none' : measure;
    set({ measureType: changed });
  },
  setStyleOption: (style: string) => set({ style }),
  setZoomLevel: (direction) => {
    const current = get().zoomLevel + direction;
    if (current === 22 || current < 1) return;
    set((state) => ({ zoomLevel: state.zoomLevel + direction }));
  },
  setMeasuredValue: (value) => {
    const measureType = get().measureType;
    if (measureType === 'distance') {
      set({ measuredValue: `${value}km` });
    }
  },
}));

export const $_setMeasuredValue = useMapOptionsStore.getState().setMeasuredValue;
