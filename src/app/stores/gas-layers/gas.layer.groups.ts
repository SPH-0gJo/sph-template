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

const LayerGroups = {
  pl: {
    layerId: 'gsf_pl_mt',
    layers: [
      { name: 'HP본관', code: '2010' },
      { name: 'HP공급관', code: '2011' },
      { name: 'HP사용자공급관', code: '2012' },
      { name: 'HP내관', code: '2013' },
      { name: 'MA본관', code: '2020' },
      { name: 'MA공급관', code: '2021' },
      { name: 'MA사용자공급관', code: '2022' },
      { name: 'MA사용자공급관', code: '2023' },
      { name: 'LP본관', code: '2030' },
      { name: 'LP공급관', code: '2031' },
      { name: 'LP사용자공급관', code: '2032' },
      { name: 'LP내관', code: '2033' },
    ],
  },
  vv: {
    layerId: 'gsf_vv_mt',
    layers: [
      { name: 'HP본관 밸브', code: '2310' },
      { name: 'HP공급관 밸브', code: '2311' },
      { name: 'HP사용자공급관 밸브', code: '2312' },
      { name: 'HP내관 밸브', code: '2313' },
      { name: 'MA본관 밸브', code: '2320' },
      { name: 'MA공급관 밸브', code: '2321' },
      { name: 'MA사용자공급관 밸브', code: '2322' },
      { name: 'MA내관 밸브', code: '2323' },
      { name: 'LP본관 밸브', code: '2330' },
      { name: 'LP공급관 밸브', code: '2331' },
      { name: 'LP사용자공급관 밸브', code: '2332' },
      { name: 'LP내관 밸브', code: '2333' },
    ],
  },
  tb: {
    layerId: 'gsf_tb_mt',
    layers: [
      { name: '고압 T/B', code: '2240' },
      { name: '중압T/B', code: '2241' },
      { name: '저압 T/B', code: '2242' },
      { name: '통합 T/B', code: '2243' },
      { name: '본딩 T/B', code: '2244' },
      { name: '케이싱 T/B', code: '2245' },
      { name: '사용시설 T/B', code: '2246' },
    ],
  },
};

interface gasLayerGroupState {
  gasLayerGroups: Map<string, GasLayer> | undefined;
  layerStyleEditorId: string | undefined;
  setLayerStyleEditorId: (id: string | undefined) => void;
  setLayerGroup: () => void;
  upsertItem: (layer: GasLayer) => void;
}

export const useGasLayerGropuStore = create<gasLayerGroupState>()((set) => ({
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
