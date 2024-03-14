import { AddLayerObject } from 'maplibre-gl';
import { GeoDataKeys } from 'shared/fixtures/pipeline';

export interface PipeInfo {
  pipe_id: string;
  gis_pl_ty_cd: string;
  gis_pres_cd: string;
  gis_pl_div_cd: string;
  pl_mtrqlt_cd: string;
}

export interface ValveInfo {
  vv_no: string;
  prj_no: string;
  vv_open_yn: string;
  pres_cd: string;
  gis_vv_typ_cd: string;
  gis_vv_form_cd: string;
  drtn_angle: string;
  instl_lc: string;
  cnstsu_date: string;
  cnstrct_entrps_nm: string;
}

export const DefaultStyleByType = (layerGroupId: GeoDataKeys) => {
  let myLayer: AddLayerObject;
  switch (layerGroupId) {
    case 'pl':
      myLayer = {
        id: `${layerGroupId}_ly`,
        type: 'line',
        source: layerGroupId,
        paint: {
          'line-width': 4,
          'line-color': '#808080', // 위에 해당하지 않는 경우 기본 색상 설정
        },
      };
      break;
    case 'vv':
      myLayer = {
        id: `${layerGroupId}_ly`,
        type: 'circle',
        source: layerGroupId,
        paint: {
          'circle-color': '#808080',
          'circle-radius': 3,
        },
      };
      break;
    case 'tb':
      myLayer = {
        id: `${layerGroupId}_ly`,
        type: 'circle',
        source: layerGroupId,
        paint: {
          'circle-color': '#808080',
          'circle-radius': 3,
        },
      };
      break;
    case 'rglt':
      myLayer = {
        id: `${layerGroupId}_ly`,
        type: 'circle',
        source: layerGroupId,
        paint: {
          'circle-color': '#333333',
          'circle-radius': 3,
        },
      };
      break;
    default:
      myLayer = {
        id: `${layerGroupId}_ly`,
        type: 'line',
        source: layerGroupId,
        paint: {
          'line-width': 4,
          'line-color': '#808080', // 위에 해당하지 않는 경우 기본 색상 설정
        },
      };
      break;
  }

  return myLayer;
};
