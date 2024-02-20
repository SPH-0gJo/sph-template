import { create } from 'zustand';

interface CoordinateSystemState {
  coordinateSystemList: Array<number>;
  setCoordinateSystemList: (coordinateSystemList: Array<number>) => void;
}

export const useCoordinateSystemStore = create<CoordinateSystemState>()((set) => ({
  coordinateSystemList: [],
  setCoordinateSystemList: (coordinateSystemList) => set({ coordinateSystemList: [...coordinateSystemList] }),
}));
