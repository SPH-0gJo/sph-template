export interface GeoDataGroup {
  name: string;
  layerId: string;
  LayerGroups: GsfLayer[];
}
export type GeoDataKeys = 'pl' | 'vv' | 'tb' | 'rglt';

export interface GsfLayer {
  name: string;
  key?: string;
  code?: string;
  groupId?: GeoDataKeys;
  sourceLayerId?: string;
  hidden?: boolean;
  style?: LayerStyle;
}

export interface LayerStyle {
  'line-color'?: string;
  'line-width'?: string | number;
  'line-dasharray'?: Array<number> | null;
  'circle-color'?: string;
  'circle-radius'?: number;
}

export type ValveFormCodeTypes = '10' | '20' | '30' | '40' | '50' | '60';

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
        style: { 'line-color': '#fc03e3', 'line-width': 1.5, 'line-dasharray': null },
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
        style: { 'line-color': '#ff000d', 'line-width': 1.5, 'line-dasharray': null },
      },
      {
        name: 'MA사용자공급관',
        key: 'GIS_PL_TY_',
        code: '2022',
        style: { 'line-color': '#ff000d', 'line-width': 1, 'line-dasharray': null },
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
        style: { 'line-color': '#0037ff', 'line-width': 1.5, 'line-dasharray': null },
      },
      {
        name: 'LP사용자공급관',
        key: 'GIS_PL_TY_',
        code: '2032',
        style: { 'line-color': '#0037ff', 'line-width': 1, 'line-dasharray': null },
      },
      {
        name: 'LP내관',
        key: 'GIS_PL_TY_',
        code: '2033',
        style: { 'line-color': '#0037ff', 'line-width': 1, 'line-dasharray': [2.5, 2.5] },
      },
    ],
  },
  // 2320:MA 본관밸브
  // 2321:MA 공급관밸브
  // 2322:MA 사용자공급관밸브
  // 2323:MA 내관밸브
  // 2330:LP 본관밸브
  // 2331:LP 공급관밸브
  // 2332:LP 사용자공급관밸브
  // 2333:LP 내관밸브
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
        name: 'HP공급관 밸브',
        key: 'GIS_VV_TYP',
        code: '2311',
        style: { 'circle-color': '#002869', 'circle-radius': 3 },
      },
      {
        name: 'HP사용자공급관 밸브',
        key: 'GIS_VV_TYP',
        code: '2312',
        style: { 'circle-color': '#002869', 'circle-radius': 3 },
      },
      {
        name: 'HP내관 밸브',
        key: 'GIS_VV_TYP',
        code: '2313',
        style: { 'circle-color': '#002869', 'circle-radius': 3 },
      },
      {
        name: 'MA본관 밸브',
        key: 'GIS_VV_TYP',
        code: '2320',
        style: { 'circle-color': '#ff000d', 'circle-radius': 3 },
      },
      {
        name: 'MA공급관 밸브',
        key: 'GIS_VV_TYP',
        code: '2321',
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
        code: '2330',
        style: { 'circle-color': '#0800ff', 'circle-radius': 3 },
      },
      {
        name: 'LP공급관 밸브',
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

export const pipelines = [
  { code: '2010', color: '#fc03e3', width: 1.5, lineStyle: 'solid' },
  { code: '2013', color: '#fc03e3', width: 1, lineStyle: 'dashed' },
  { code: '2020', color: '#ff000d', width: 1.5, lineStyle: 'solid' },
  { code: '2022', color: '#ff000d', width: 1, lineStyle: 'solid' },
  { code: '2023', color: '#ff000d', width: 1, lineStyle: 'dashed' },
  { code: '2031', color: '#0037ff', width: 1.5, lineStyle: 'solid' },
  { code: '2032', color: '#0037ff', width: 1, lineStyle: 'solid' },
  { code: '2033', color: '#0037ff', width: 1, lineStyle: 'dashed' },
];

export const pipelineStrokeStyleOptions = [
  { key: '1', label: 'solid', value: null },
  { key: '2', label: 'dashed', value: [2.5, 2.5] },
  { key: '3', label: 'dotted', value: [1.5, 1.5] },
];

export const rglt = [
  { code: '2111', color: '#fc03e3' },
  { code: '2112', color: '#fc03e3' },
];

export const tbs = [
  { code: '2240', color: '#fc03e3' },
  { code: '2241', color: '#fc03e3' },
  { code: '2242', color: '#fc03e3' },
];
export const valveFormTypes: { [key in ValveFormCodeTypes]: string } = {
  '10': '볼밸브(NONE-PURGE)',
  '20': '용접형 매몰볼밸브(NONE-PURGE)',
  '30': '용접형 매몰볼밸브(ONE-PURGE)',
  '40': '용접형 매몰볼밸브(TWO-PURGE)',
  '50': '절연 볼밸브',
  '60': 'BOX 형 밸브',
};

export const valves: { code: string; color: string }[] = [
  { code: '2310', color: '#fc03e3' },
  { code: '2311', color: '#fc03e3' },
  { code: '2312', color: '#fc03e3' },
  { code: '2313', color: '#fc03e3' },
  { code: '2320', color: '#ff000d' },
  { code: '2321', color: '#ff000d' },
  { code: '2322', color: '#ff000d' },
  { code: '2323', color: '#ff000d' },
  { code: '2330', color: '#0037ff' },
  { code: '2331', color: '#0037ff' },
  { code: '2332', color: '#0037ff' },
  { code: '2333', color: '#0037ff' },
];
