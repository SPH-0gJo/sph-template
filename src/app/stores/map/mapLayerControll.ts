import { create } from 'zustand';

interface mapLayerControllState {
  currentMap: string;
  currentStyle: string;
  setCurrentMap: (currentMap: string) => void;
  setCurrentStyle: (currentStyle: string) => void;
}

export const useMapLayerControllStore = create<mapLayerControllState>((set) => ({
  currentMap: 'vWorld',
  setCurrentMap: (currentMap) =>
    set(() => ({
      currentMap: currentMap,
    })),
  currentStyle: 'Origin',
  setCurrentStyle: (currentStyle) =>
    set(() => ({
      currentStyle: currentStyle,
    })),
}));
