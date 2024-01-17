import React from 'react';
import styled from 'styled-components';

const DataTableTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  p {
    font-size: 0.75rem;
    color: var(--light-text-secondary);
  }
`;

const SearchInput = styled.input.attrs(() => ({
  type: 'search',
}))`
  background-color: var(--light-surface-level-3);
  border-radius: 2rem;
  padding: 0.32rem 0.5rem;
  border: 0;
  &:focus-visible {
    outline: 1px solid var(--light-secondary-a64);
  }
  &.input-lg {
    padding: 0.5rem 0.75rem;
  }
`;

export const DataTableSearchBar = () => {
  return (
    <DataTableTop>
      <SearchInput type='search' placeholder='검색어를 입력하세요.' />
      <p>{/* 전체: <span>345,966</span>*/}</p>
    </DataTableTop>
  );
};
