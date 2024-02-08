import { LayerGroupData, LayerGroupKeys } from 'shared/fixtures/layer.groups';
import { create } from 'zustand';

interface LayerGroupState {
  layerIdList: Array<LayerGroupKeys>;
  setLayerIdList: (layerIdList: Array<LayerGroupKeys>) => void;
  layerGroupsList: Array<string>;
  setLayerGroupsList: (layerGroupsList: Array<string>) => void;
}

export const useLayerGroupStore = create<LayerGroupState>()(set => ({
  layerIdList: ['pipeline'],
  setLayerIdList: (layerIdList) => set({ layerIdList: [...layerIdList] }),
  layerGroupsList: [...LayerGroupData['pipeline'].layers],
  setLayerGroupsList: (layerGroupsList) => set({ layerGroupsList: [...layerGroupsList] }),
}));
