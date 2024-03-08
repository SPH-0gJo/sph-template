import { create } from 'zustand';

interface naverRoadViewState {
  naverRoadViewMap: boolean;
  naverRoadViewCoords: { lng: number; lat: number } | undefined;
  naverRoadViewSize: { width: number; height: number } | undefined;
  setNaverRoadViewMap: () => void;
  setNaverRoadViewCoords: (coords: { lng: number; lat: number } | undefined) => void;
  setNaverRoadViewSize: (size: { width: number; height: number } | undefined) => void;
}

export const useNaverRoadViewStore = create<naverRoadViewState>()((set) => ({
  naverRoadViewMap: false,
  naverRoadViewCoords: undefined,
  naverRoadViewSize: { width: 800, height: 600 },
  setNaverRoadViewMap: () => set((state) => ({ naverRoadViewMap: !state.naverRoadViewMap })),
  setNaverRoadViewCoords: (coords) => {
    if (coords) set({ naverRoadViewCoords: { ...coords } });
    else set({ naverRoadViewCoords: undefined });
  },
  setNaverRoadViewSize: (size) => {
    const payload = size || { width: 800, height: 600 };
    set({ naverRoadViewSize: { ...payload } });
  },
}));
