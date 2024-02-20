import { create } from 'zustand';

export interface ScreenGridState {
  cellSize: number;
  setCellSize: (cellSize: number) => void;
  gpuAggregation: boolean;
  setGpuAggregation: (gpuAggregation: boolean) => void;
}

export const useScreenGridStore = create<ScreenGridState>()((set) => ({
  cellSize: 16,
  setCellSize: (cellSize) => set({ cellSize: cellSize }),
  gpuAggregation: true,
  setGpuAggregation: (gpuAggregation) => set({ gpuAggregation: gpuAggregation }),
}));
