import { create } from 'zustand';

export interface HexagonState {
  coverage: number;
  setCoverage: (coverage: number) => void;
  radius: number;
  setRadius: (radius: number) => void;
  upper: number;
  setUpper: (upper: number) => void;
}

export const useHexagonStore = create<HexagonState>()((set) => ({
  coverage: 1,
  setCoverage: (coverage) => set({ coverage: coverage }),
  radius: 1000,
  setRadius: (radius) => set({ radius: radius }),
  upper: 100,
  setUpper: (upper) => set({ upper: upper }),
}));
