export type LayerGroupKeys = 'pipeline';

export interface LayerGroup {
  layers: Array<string>;
}

export const LayerGroupData: { [key in LayerGroupKeys]: LayerGroup } = {
  pipeline: {
    layers: ['gsf_pl_mt', 'gsf_vv_mt', 'gsf_rglt_mt'],
  },
};