import React from 'react';
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

export const ValveContents = (props: FacilityBoxContentsProps) => {
  return (
    <LayerBoxContentsContainer>
      <ListTableWrapper>
        <table>
          <thead>
            <tr>
              <th>밸브 ID</th>
              <th>유형</th>
              <th>압력</th>
              <th>형식</th>
            </tr>
          </thead>
          <tbody>
            {props.contentList.length === 0 ? (
              <>선택 지 내 결과 없음 이동해주세요</>
            ) : (
              props.contentList.map((content, index) => {
                return (
                  <tr key={index}>
                    <td>{content.properties?.vv_no ? content.properties.vv_no : '-'}</td>
                    <td>{content.properties?.gis_vv_typ_cd ? content.properties.gis_vv_typ_cd : '-'}</td>
                    {/* <td>{content.properties.??필드 값 확인 불가능}</td>*/}
                    <td>{content.properties?.pres_cd ? content.properties.pres_cd : '-'}</td>
                    <td>{content.properties?.gis_vv_for ? content.properties.gis_vv_for : '-'}</td>
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
