import { DataTableOptions } from 'shared/constants/types/datatable';

export const pipelineOptions: DataTableOptions = {
  columns: {
    headers: [
      { header: '배관번호', column: 'pl_no' },
      { header: 'GIS배관유형', column: 'gis_pl_ty_' },
      { header: 'GIS압력', column: 'gis_pres_c' },
      { header: '배관재질', column: 'pl_mtrqlt_' },
      { header: '탐사구분', column: 'iqt_cde' },
      { header: '탐사년월', column: 'iqt_yymm' },
    ],
  },
  // options: {
  //   sortable: ['annotation_name', 'start_at', 'duration'],
  //   orderBy: { column: 'start_at', ascending: true },
  // },
};

export interface GSFPipelineData {
  id: number | string;
  user_id?: number;
  pl_no: string;
  pipe_id: string;
  pl_mngno: string;
  gis_regn_c: string;
  gis_pl_ty_: string;
  gis_pres_c: string;
  gis_pl_div: string;
  pl_mtrqlt_: string;
  pipsz_cd: string;
  extns: number;
  instl_lc: string;
  cnstsu_dat: string;
  cnstrct_en: string;
  zone_cd: string;
  enabled: string;
  gis_lyr_cd: string;
  iqt_cde: string;
  iqt_yymm: string;
}

export interface GSFPipelineResponse {
  data: GSFPipelineData[];
}
