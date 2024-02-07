import React, { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { gsfApis } from 'app/api/pipeline.api';
import { DataTable } from 'app/components/common-ui/index';
import { useGsfLayerStore } from 'app/stores/gsfLayers';
import { pipelineOptions } from 'shared/fixtures/pipeline.data';
import { columnValue } from 'shared/modules/gsf.pipeline';
import styled from 'styled-components';

const GSFLayerDataBox = styled.div`
  position: fixed;
  bottom: 1.25rem;
  left: 1.25rem;
  background-color: var(--white);
  display: flex;
  border-radius: 0.625rem;
`;

const GSFLayerDataWrapper = styled.div`
  flex: 1;
  background-color: #fff;
  bottom: 1.25rem;
  left: 1.25rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  max-width: calc(100vw - 2.5rem);
`;

const GSFLayerDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.9375rem;
  border-bottom: 1px solid var(--divider);
  h6 {
    line-height: 1;
    font-size: 1rem;
  }
`;

export const GSFLayerData = () => {
  const { layerDataTableId, setLayerDataTableId } = useGsfLayerStore();
  const {
    isLoading,
    data: layerData,
    error,
    refetch,
  } = useQuery('layerData', async () => {
    if (!layerDataTableId) return [];
    const arr = layerDataTableId.split('_') || [];
    const gisType = arr.at(-1);
    if (!gisType) return [];
    try {
      const { data } = await gsfApis.pipeline(gisType);
      return data.data;
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    return () => {
      setLayerDataTableId(undefined);
    };
  }, []);

  useEffect(() => {
    if (layerDataTableId === undefined) return;
    /* Todo: Should remove warning message later */
    refetch().then((data) => console.debug(data));
  }, [layerDataTableId]);

  const rawData: Array<string | number | undefined>[] = useMemo(() => {
    if (!layerData) return [];
    return layerData.map((e) => {
      // eslint-disable-next-line camelcase
      const { pl_no: plNo, gis_pl_ty_, gis_pres_c, pl_mtrqlt_, iqt_cde, iqt_yymm } = e;
      const gitPlType = columnValue('gisTypeCd', gis_pl_ty_);
      const gisPress = columnValue('gisPresCd', gis_pres_c);
      const mtrglt = columnValue('plMtrqltCd', pl_mtrqlt_);
      const iqtCde = columnValue('iqtCde', iqt_cde);
      // eslint-disable-next-line camelcase
      return [plNo, gitPlType, gisPress, mtrglt, iqtCde, iqt_yymm];
    });
  }, [layerData]);

  if (isLoading) return <></>;
  if (error) {
    console.error('fail to get data');
    return <></>;
  }

  return (
    <GSFLayerDataBox>
      <GSFLayerDataWrapper>
        <GSFLayerDataHeader>
          <h6>배관</h6>
          <button className='btn btn-close' onClick={() => setLayerDataTableId(undefined)}>
            <em className='icon-close-large' />
          </button>
        </GSFLayerDataHeader>
        {layerData && <DataTable data={{ options: pipelineOptions, rawData }} />}
      </GSFLayerDataWrapper>
    </GSFLayerDataBox>
  );
};
