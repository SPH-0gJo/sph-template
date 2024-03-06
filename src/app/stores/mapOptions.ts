import { create } from 'zustand';

interface MapOptionState {
  style: string;
  zoomLevel: number;
  setStyleOption: (style: string) => void;
  setZoomLevel: (direction: number) => void;
  setZoom: (zoom: number) => void;
}

export const useMapOptionsStore = create<MapOptionState>()((set, get) => ({
  style: 'https://api.maptiler.com/maps/streets/style.json?key=DifPnucmd6PF6UqDKcMm',
  zoomLevel: 6,
  setStyleOption: (style: string) => set({ style }),
  setZoomLevel: (direction) => {
    const current = get().zoomLevel + direction;
    if (current === 22 || current < 1) return;
    set((state) => ({ zoomLevel: state.zoomLevel + direction }));
  },
  setZoom: (zoom: number) => set({ zoomLevel: zoom }),
}));
