import { create } from 'zustand';

interface LayerGroupState {
  layerIdList: Array<string>;
  setLayerIdList: (layerIdList: Array<string>) => void;
}

export const useLayerGroupStore = create<LayerGroupState>()(set => ({
  layerIdList: ['pipeline'],
  setLayerIdList: (layerIdList) => set({ layerIdList: [...layerIdList] }),
}));
