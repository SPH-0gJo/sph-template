import React, { useMemo } from 'react';
import { columnValue } from 'shared/modules/gsf.pipeline';
import styled from 'styled-components';

const TD = styled.td`
  padding: 0.4rem 0.6rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 0.75rem;
  &:last-child {
    border-right: 0;
  }
  input[type='text'] {
    width: 8rem;
    //background-color: var(--light-surface-level-2);
    padding: 0.3rem 0.45rem 0.25rem;
    border-bottom: 1px solid transparent;
    font-size: 0.75rem;
    transition: all 0.2s;
    border-radius: 0;
    background-color: var(--light-surface-level-3);
    //border-radius: 0.2rem;
    //padding: 0.32rem 0.5rem;
    border: 0;
    &:focus-visible {
      border-bottom: 1px solid var(--light-secondary-origin);
      outline: none;
    }
  }
`;

interface DataTableTbodyProps {
  data?: Array<string | number | undefined>[];
}

export const DataTableTbody = (props: DataTableTbodyProps) => {
  const { data: RowData } = props;
  function getTd(values: Array<string | number | undefined>) {
    return values.map((e, index) => <TD key={index}>{e}</TD>);
  }
  return (
    <tbody>
      {RowData &&
        RowData.map((values, index) => {
          const trs = getTd(values);
          return (
            <tr key={index}>
              {trs}
              {/* <TD>*/}
              {/*  <button className='btn btn-sm btn-secondary'>수정</button>*/}
              {/*  <button className='btn btn-sm btn-error'>삭제</button>*/}
              {/* </TD>*/}
            </tr>
          );
        })}
      <tr>
        <TD>
          <input type='text' placeholder='데이터1' />
        </TD>
        <TD>
          <input type='text' />
        </TD>
        <TD>
          <input type='text' />
        </TD>
        <TD>
          <input type='text' />
        </TD>
        <TD>
          <input type='text' />
        </TD>
        <TD>
          <input type='text' />
        </TD>
        {/* <TD>*/}
        {/*  <button className='btn btn-sm btn-secondary'>수정</button>*/}
        {/*  <button className='btn btn-sm btn-error'>삭제</button>*/}
        {/* </TD>*/}
      </tr>
    </tbody>
  );
};
