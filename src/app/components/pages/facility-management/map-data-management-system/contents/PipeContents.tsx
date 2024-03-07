import React from 'react';
import { ColorBar } from 'app/components/pages/facility-management/map-data-management-system/contents/ColorBar';
import { Feature } from 'geojson';
import styled from 'styled-components';

const LayerBoxContentsContainer = styled.div`
  width: 100%;
  display: flex;
  height: 42.75rem;
  align-items: flex-start;
  flex-shrink: 0;
`;

interface FacilityBoxContentsProps {
  contentList: Array<Feature>;
}

const ListTableWrapper = styled.div`
  width: 100%;
  height: 35rem;
  overflow-y: auto; /* 세로 스크롤 활성화 */

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid var(--light-secondary-a16, rgba(0, 68, 120, 0.16));
    background: var(--light-secondary-a8, rgba(0, 68, 120, 0.08));
  }

  td {
    padding: 8px;
    text-align: left;
    position: relative;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
  }

  tbody {
    tr:hover td {
      background-color: lightgray;
    }

    td > span {
      padding-left: 1rem;
    }
  }
`;

export const PipeContents = (props: FacilityBoxContentsProps) => {
  const typeColor: { [key: number]: string } = {
    2010: 'pink',
    2011: 'purple',
    2012: 'green',
    2013: 'blue',
    2020: 'pink',
    2021: 'purple',
    2022: 'green',
    2023: 'blue',
    2030: 'pink',
    2031: 'purple',
    2032: 'green',
  };
  return (
    <LayerBoxContentsContainer>
      <ListTableWrapper>
        <table>
          <thead>
            <tr>
              <th>배관 ID</th>
              <th>유형</th>
              <th>압력</th>
              <th>재질</th>
              <th>연장</th>
            </tr>
          </thead>
          <tbody>
            {props.contentList.length === 0 ? (
              <>선택 지 내 결과 없음 이동해주세요</>
            ) : (
              props.contentList.map((content, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <ColorBar color={typeColor[content.properties?.gis_pl_ty_cd] || 'white'} />)
                      <span> {content.properties?.pipe_id ? content.properties.pipe_id : '-'}</span>
                    </td>
                    <td>{content.properties?.gis_pl_ty_cd ? content.properties.gis_pl_ty_cd : '-'}</td>
                    <td>{content.properties?.gis_pres_cd ? content.properties.gis_pres_cd : '-'}</td>
                    <td>{content.properties?.gis_pl_div_cd ? content.properties.gis_pl_div_cd : '-'}</td>
                    <td>{content.properties?.pl_mtrqlt_cd ? content.properties.pl_mtrqlt_cd : '-'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </ListTableWrapper>
    </LayerBoxContentsContainer>
  );
};
