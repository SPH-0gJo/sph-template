import { create } from 'zustand';

export interface ContourState {
  cellSize: number;
  setCellSize: (cellSize: number) => void;
  week: number;
  setWeek: (week: number) => void;
}

export const useContourStore = create<ContourState>()((set) => ({
  cellSize: 60000,
  setCellSize: (cellSize) => set({ cellSize: cellSize }),
  week: 30,
  setWeek: (week) => set({ week: week }),
}));
