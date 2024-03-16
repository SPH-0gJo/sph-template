import { LayerGroups } from 'app/stores/gas-layers/layer.groups';
import { create } from 'zustand';

export interface GasLayer {
  name: string;
  key?: string;
  code?: string;
  groupId?: GeoDataKeys;
  sourceLayerId?: string;
  hidden?: boolean;
}
export type GeoDataKeys = 'pl' | 'vv' | 'tb' | 'rglt';

interface gasLayerGroupState {
  gasLayerGroups: Map<string, GasLayer> | undefined;
  layerStyleEditorId: string | undefined;
  setLayerStyleEditorId: (id: string | undefined) => void;
  setLayerGroup: () => void;
  upsertItem: (layer: GasLayer) => void;
}

export const useGasLayerGroupStore = create<gasLayerGroupState>()((set) => ({
  gasLayerGroups: undefined,
  layerStyleEditorId: undefined,
  setLayerGroup: () => {
    const gasLayerData: Map<string, GasLayer> = new Map();
    const groupKeys = Object.keys(LayerGroups) as GeoDataKeys[];
    groupKeys.forEach((groupId) => {
      const { layerId, layers } = LayerGroups[groupId as keyof typeof LayerGroups];
      layers.forEach((layer) => {
        const { code } = layer;
        const sourceLayerId = `${layerId}_${code}`;
        gasLayerData.set(sourceLayerId, { ...layer, sourceLayerId, groupId, hidden: false });
        set({ gasLayerGroups: gasLayerData });
      });
    });
  },
  setLayerStyleEditorId: (layerStyleEditorId) => {
    set((state) => {
      const current = state.layerStyleEditorId;
      if (current === layerStyleEditorId) return { layerStyleEditorId: undefined };
      return { layerStyleEditorId };
    });
  },
  upsertItem: (layer: GasLayer) => {
    const { sourceLayerId } = layer;
    if (!sourceLayerId) return;
    set((state) => {
      const updatedItems = new Map(state.gasLayerGroups);
      updatedItems.set(sourceLayerId, layer);
      return { gasLayerGroups: updatedItems };
    });
  },
}));
