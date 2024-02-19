import React from 'react';
import { Headers } from 'shared/constants/types/datatable';
import styled from 'styled-components';

const Thead = styled.thead`
  tr {
    background: var(--light-secondary-a8);
  }
`;

const Th = styled.th`
  color: var(--light-secondary-dark);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.4375rem 0.75rem;
  border-right: 1px solid var(--light-secondary-a16);
  border-bottom: 1px solid var(--line);
  position: relative;
  &:last-child {
    border-right: 0;
  }
  &.th-sorting {
    cursor: pointer;
    em {
      opacity: 0.3;
      position: absolute;
      right: 0.3rem;
      font-size: 1rem;
    }
    &:hover {
      em {
        opacity: 1;
      }
    }
  }
`;

interface DataTableTheadProps {
  columns: Headers;
}

export const DataTableThead = (props: DataTableTheadProps) => {
  const { headers } = props.columns;
  return (
    <Thead>
      <tr>
        {headers &&
          headers.map((col) => {
            const { header, column } = col;
            return (
              <Th className='th-sorting' key={column}>
                {header} <em className='icon-arrow-down' />
              </Th>
            );
          })}
        {/* <Th className='th-sorting'>수정/삭제</Th>*/}
      </tr>
    </Thead>
  );
};
