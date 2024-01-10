import React from 'react';
import styled from 'styled-components';

const DataTableWrapper = styled.div`
    position: absolute;\
    background-color: #fff;
    bottom: 1.25rem;
    left: 1.25rem;
    border-radius: 0.625rem;
    background: var(--white);
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    max-width: calc(100vw - 2.5rem);
`;

export const DataTable = () => {
  return (
    <DataTableWrapper className="data-table-wrapper">
      <div className="data-table-head">
        <h6 className="data-table-title">테이블 제목</h6>
        <button className="btn btn-close">
          <em className="icon-close-large" />
        </button>
      </div>
      <div className="data-table-body">
        <div className="data-table-top">
          <input className="input-lg" type="search" placeholder="검색어를 입력하세요."/>
          <p>전체: <span>345,966</span></p>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
            <tr>
              <th className="th-sorting">컬럼명 1 <em className="icon-arrow-down"></em></th>
              <th className="th-sorting">컬럼명 2 <em className="icon-arrow-up"></em></th>
              <th className="th-sorting">컬럼명 3</th>
              <th className="th-sorting">컬럼명 4</th>
              <th className="th-sorting">컬럼명 5</th>
              <th className="th-sorting">컬럼명 6</th>
              <th className="th-sorting">수정/삭제</th>
            </tr>
            </thead>
            <tbody>
            <tr></tr>
            <tr>
              <td>데이터</td>
              <td>데이터</td>
              <td>데이터</td>
              <td>데이터</td>
              <td>데이터</td>
              <td>데이터</td>
              <td>
                <button className="btn btn-sm btn-secondary">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
              </td>
            </tr>
            <tr>
              <td><input type="text" placeholder="데이터1" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td>
                <button className="btn btn-sm btn-secondary">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>

    </DataTableWrapper>
  );
}


