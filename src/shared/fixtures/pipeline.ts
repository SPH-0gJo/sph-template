export type GeoDataKeys = 'pl' | 'vv' | 'tb' | 'rglt';
export interface LayerStyle {
  'line-color'?: string;
  'line-width'?: string | number;
  'line-dasharray'?: Array<number>;
  'circle-color'?: string;
  'circle-radius'?: number;
}

export interface GsfLayer {
  name: string;
  key?: string;
  code?: string;
  groupId?: GeoDataKeys;
  sourceLayerId?: string;
  hidden?: boolean;
  style?: LayerStyle;
}

export interface GeoDataGroup {
  name: string;
  layerId: string;
  LayerGroups: GsfLayer[];
}

// eslint-disable-next-line camelcase
export const geo_data: { [key in GeoDataKeys]: GeoDataGroup } = {
  pl: {
    name: '배관',
    layerId: 'gsf_pl_mt',
    LayerGroups: [
      {
        name: 'HP본관',
        key: 'GIS_PL_TY_',
        code: '2010',
        style: { 'line-color': '#fc03e3', 'line-width': 1.5 },
      },
      {
        name: 'HP내관',
        key: 'GIS_PL_TY_',
        code: '2013',
        style: { 'line-color': '#fc03e3', 'line-width': 1, 'line-dasharray': [2.5, 2.5] },
      },
      {
        name: 'MA본관',
        key: 'GIS_PL_TY_',
        code: '2020',
        style: { 'line-color': '#ff000d', 'line-width': 1.5 },
      },
      {
        name: 'MA사용자공급관',
        key: 'GIS_PL_TY_',
        code: '2022',
        style: { 'line-color': '#ff000d', 'line-width': 1 },
      },
      {
        name: 'MA내관',
        key: 'GIS_PL_TY_',
        code: '2023',
        style: { 'line-color': '#ff000d', 'line-width': 1, 'line-dasharray': [2.5, 2.5] },
      },
      {
        name: 'LP본관',
        key: 'GIS_PL_TY_',
        code: '2031',
        style: { 'line-color': '#0037ff', 'line-width': 1.5 },
      },
      {
        name: 'LP사용자공급관',
        key: 'GIS_PL_TY_',
        code: '2032',
        style: { 'line-color': '#0037ff', 'line-width': 1 },
      },
      {
        name: 'LP내관',
        key: 'GIS_PL_TY_',
        code: '2033',
        style: { 'line-color': '#0037ff', 'line-width': 1, 'line-dasharray': [2.5, 2.5] },
      },
    ],
  },
  vv: {
    name: '밸브',
    layerId: 'gsf_vv_mt',
    LayerGroups: [
      {
        name: 'HP본관 밸브',
        key: 'GIS_VV_TYP',
        code: '2310',
        style: { 'circle-color': '#fc03e3', 'circle-radius': 3 },
      },
      {
        name: 'HP내관 밸브',
        key: 'GIS_VV_TYP',
        code: '2310',
        style: { 'circle-color': '#002869', 'circle-radius': 3 },
      },
      {
        name: 'MA본관 밸브',
        key: 'GIS_VV_TYP',
        code: '2320',
        style: { 'circle-color': '#ff000d', 'circle-radius': 3 },
      },
      {
        name: 'MA사용자공급관 밸브',
        key: 'GIS_VV_TYP',
        code: '2322',
        style: { 'circle-color': '#9d00ff', 'circle-radius': 3 },
      },
      {
        name: 'MA내관 밸브',
        key: 'GIS_VV_TYP',
        code: '2323',
        style: { 'circle-color': '#ff6f00', 'circle-radius': 3 },
      },
      {
        name: 'LP본관 밸브',
        key: 'GIS_VV_TYP',
        code: '2331',
        style: { 'circle-color': '#0800ff', 'circle-radius': 3 },
      },
      {
        name: 'LP사용자공급관 밸브',
        key: 'GIS_VV_TYP',
        code: '2332',
        style: { 'circle-color': '#00b7ff', 'circle-radius': 3 },
      },
      {
        name: 'LP내관 밸브',
        key: 'GIS_VV_TYP',
        code: '2333',
        style: { 'circle-color': '#0f0404', 'circle-radius': 3 },
      },
    ],
  },
  tb: {
    name: 'TB',
    layerId: 'gsf_tb_mt',
    LayerGroups: [
      {
        name: '고압 Test-Box',
        key: 'GIS_TB_TY_',
        code: '2240',
        style: { 'circle-color': '#fc03e3', 'circle-radius': 3 },
      },
      {
        name: '중압 Test-Box',
        key: 'GIS_TB_TY_',
        code: '2241',
        style: { 'circle-color': '#fc03e3', 'circle-radius': 3 },
      },
      {
        name: '저압 Test-Box',
        key: 'GIS_TB_TY_',
        code: '2242',
        style: { 'circle-color': '#fc03e3', 'circle-radius': 3 },
      },
    ],
  },
  rglt: {
    name: '정압기',
    layerId: 'gsf_rglt_mt',
    LayerGroups: [
      { name: '지역정압기', code: '2111', style: { 'circle-color': '#fc03e3', 'circle-radius': 3 } },
      { name: '전용정압기', code: '2112', style: { 'circle-color': '#fc03e3', 'circle-radius': 3 } },
    ],
  },
};
