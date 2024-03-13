import React from 'react';
import { GeoJsonProperties } from 'geojson';
import { GeoDataKeys } from 'shared/fixtures/pipeline';

interface TypeRowProps {
  layerGroupId: GeoDataKeys | undefined;
  info: GeoJsonProperties;
}

export const TypeRow = (props: TypeRowProps) => {
  const { info, layerGroupId } = props;
  return (
    <>
      {layerGroupId === 'pl' ? (
        <>
          <span> {info?.pipe_id ? info.pipe_id : '-'}</span>
          <span>{info?.gis_pl_ty_cd ? info.gis_pl_ty_cd : '-'}</span>
          <span>{info?.gis_pres_cd ? info.gis_pres_cd : '-'}</span>
          <span>{info?.gis_pl_div_cd ? info.gis_pl_div_cd : '-'}</span>
          <span>{info?.pl_mtrqlt_cd ? info.pl_mtrqlt_cd : '-'}</span>
        </>
      ) : (
        <>
          <span> {info?.vv_no ? info.vv_no : '-'}</span>
          <span>{info?.gis_vv_typ_cd ? info.gis_vv_typ_cd : '-'}</span>
          <span>{info?.pres_cd ? info.pres_cd : '-'}</span>
          <span>{info?.gis_vv_form_cd ? info.gis_vv_form_cd : '-'}</span>
          <span>{info?.drtn_angle ? parseInt(info.drtn_angle) : '-'}</span>
        </>
      )}
    </>
  );
};
