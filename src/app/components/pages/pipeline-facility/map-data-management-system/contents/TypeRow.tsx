import React from 'react';
import { GeoJsonProperties } from 'geojson';
import { GeoDataKeys } from 'shared/fixtures/pipeline';

interface TypeRowProps {
  layerGroupId: GeoDataKeys | undefined;
  info: GeoJsonProperties;
}

export const TypeRow = (props: TypeRowProps) => {
  const { info, layerGroupId } = props;

  if (layerGroupId === 'pl') {
    return (
      <>
        <span>{info?.pipe_id || '-'}</span>
        <span>{info?.gis_pl_ty_cd || '-'}</span>
        <span>{info?.gis_pres_cd || '-'}</span>
        <span>{info?.gis_pl_div_cd || '-'}</span>
        <span>{info?.pl_mtrqlt_cd || '-'}</span>
      </>
    );
  }
  if (layerGroupId === 'vv') {
    return (
      <>
        <span>{info?.vv_no || '-'}</span>
        <span>{info?.gis_vv_typ_cd || '-'}</span>
        <span>{info?.pres_cd || '-'}</span>
        <span>{info?.gis_vv_form_cd || '-'}</span>
        <span>{info?.drtn_angle ? parseInt(info.drtn_angle) : '-'}</span>
      </>
    );
  }
  if (layerGroupId === 'tb') {
    const tbType: { [key: string]: string } = {
      '2240': '고압 T/B',
      '2241': '중압 T/B',
      '2242': '저압 T/B',
      '2243': '통합 T/B',
      '2244': '본딩 T/B',
      '2245': '케이싱 T/B',
      '2246': '사용시설 T/B',
    };
    return (
      <>
        <span>{info?.tb_mngno || '-'}</span>
        <span>{info?.gis_tb_ty_cd ? tbType[info.gis_tb_ty_cd] || '-' : '-'}</span>
        <span>{info?.gis_pres_cd || '-'}</span>
        <span>{info?.pres_cd || '-'}</span>
        {/* 각도의 값이 길어 변경*/}
        <span>{info?.drtn_angl ? parseFloat(info.drtn_angl).toFixed(3) : '-'}</span>
      </>
    );
  }
  if (layerGroupId === 'rglt') {
    return (
      <>
        <span>{info?.rglt_mngno || '-'}</span>
        <span>{info?.rglt_nm || '-'}</span>
        <span>{info?.pres_cd || '-'}</span>
        <span>{info?.rglt_ty_cd || '-'}</span>
      </>
    );
  }
};
