import { facilityManagementApi } from 'app/api/facility-management.api';
import { GeoDataKeys, GsfLayer } from 'shared/fixtures/pipeline';
import { create } from 'zustand';

interface GsfLayerState {
  gsfLayerGroups: Map<string, GsfLayer> | undefined;
  layerDataTableId: string | undefined;
  layerStyleEditorId: string | undefined;
  setLayerGroup: () => void;
  setLayerDataTableId: (id: string | undefined) => void;
  setLayerStyleEditorId: (id: string | undefined) => void;
  upsertItem: (layer: GsfLayer) => void;
}

export const useGsfLayerStore = create<GsfLayerState>()((set) => ({
  gsfLayerGroups: undefined,
  layerDataTableId: undefined,
  layerStyleEditorId: undefined,
  setLayerGroup: async () => {
    const { data } = await facilityManagementApi.geoData();
    const groupKeys = Object.keys(data) as GeoDataKeys[];
    const geoDataMap: Map<string, GsfLayer> = new Map();
    groupKeys.forEach((groupId) => {
      const { LayerGroups, layerId } = data[groupId];
      LayerGroups.forEach((layer) => {
        const { code } = layer;
        const sourceLayerId = `${layerId}_${code}`;
        geoDataMap.set(sourceLayerId, { ...layer, sourceLayerId, groupId, hidden: false });
      });
    });
    set({ gsfLayerGroups: geoDataMap });
  },
  setLayerDataTableId: (layerDataTableId) => {
    set((state) => {
      const current = state.layerDataTableId;
      if (current === layerDataTableId) return { layerDataTableId: undefined };
      return { layerDataTableId };
    });
  },
  setLayerStyleEditorId: (layerStyleEditorId) => {
    set((state) => {
      const current = state.layerStyleEditorId;
      if (current === layerStyleEditorId) return { layerStyleEditorId: undefined };
      return { layerStyleEditorId };
    });
  },
  upsertItem: (layer: GsfLayer) => {
    const { sourceLayerId } = layer;
    if (!sourceLayerId) return;
    set((state) => {
      const updatedItems = new Map(state.gsfLayerGroups);
      updatedItems.set(sourceLayerId, layer);
      return { gsfLayerGroups: updatedItems };
    });
  },
}));
