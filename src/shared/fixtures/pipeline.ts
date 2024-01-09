export type GeoDataKeys = 'pl' | 'vv' | 'tb' | 'rglt';
export interface GsfLayer {
  name: string;
  key?: string;
  code?: string;
  groupId?: GeoDataKeys;
  sourceLayerId?: string;
  hidden?: boolean;
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
      { name: 'HP본관', key: 'GIS_PL_TY_', code: '2010' },
      { name: 'HP내관', key: 'GIS_PL_TY_', code: '2013' },
      { name: 'MA본관', key: 'GIS_PL_TY_', code: '2020' },
      { name: 'MA사용자공급관', key: 'GIS_PL_TY_', code: '2022' },
      { name: 'MA내관', key: 'GIS_PL_TY_', code: '2023' },
      { name: 'LP본관', key: 'GIS_PL_TY_', code: '2031' },
      { name: 'LP사용자공급관', key: 'GIS_PL_TY_', code: '2032' },
      { name: 'LP내관', key: 'GIS_PL_TY_', code: '2033' },
    ],
  },
  vv: {
    name: '밸브',
    layerId: 'gsf_vv_mt',
    LayerGroups: [
      { name: 'HP본관 밸브', key: 'GIS_VV_TYP', code: '2310' },
      { name: 'HP내관 밸브', key: 'GIS_VV_TYP', code: '2310' },
      { name: 'MA본관 밸브', key: 'GIS_VV_TYP', code: '2320' },
      { name: 'MA사용자공급관 밸브', key: 'GIS_VV_TYP', code: '2322' },
      { name: 'MA내관 밸브', key: 'GIS_VV_TYP', code: '2323' },
      { name: 'LP본관 밸브', key: 'GIS_VV_TYP', code: '2331' },
      { name: 'LP사용자공급관 밸브', key: 'GIS_VV_TYP', code: '2332' },
      { name: 'LP내관 밸브', key: 'GIS_VV_TYP', code: '2333' },
    ],
  },
  tb: {
    name: 'TB',
    layerId: 'gsf_tb_mt',
    LayerGroups: [
      { name: '고압 Test-Box', key: 'GIS_TB_TY_', code: '2240' },
      { name: '중압 Test-Box', key: 'GIS_TB_TY_', code: '2241' },
      { name: '저압 Test-Box', key: 'GIS_TB_TY_', code: '2242' },
    ],
  },
  rglt: {
    name: '정압기',
    layerId: 'gsf_rglt_mt',
    LayerGroups: [
      { name: '지역정압기', code: '2111' },
      { name: '전용정압기', code: '2112' },
    ],
  },
};
