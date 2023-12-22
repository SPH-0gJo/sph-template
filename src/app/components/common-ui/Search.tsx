import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 1.75rem;
  background-color: var(--light-surface-level-2);
  height: 3rem;
  min-width: 22.5rem;
  max-width: 45rem;
`;

const SearchBase = styled.div`
  flex: 1;
  height: 3rem;
  padding: 0.25rem 1.25rem;
`;

const SearchInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  width: 100%;
  height: 100%;
  border: 0;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const SearchIconButton = styled.div`
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

interface SearchProps {
  setInputText: (inputText: string | undefined) => void;
}

export const Search = (props: SearchProps) => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  useEffect(() => {
    props.setInputText(searchText);
  }, [searchText]);

  return (
    <SearchWrapper>
      <SearchBase>
        <SearchInput
          className='body'
          placeholder='검색어를 입력하세요.'
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </SearchBase>
      <SearchIconButton>
        <em className='icon-magnifier-large' />
      </SearchIconButton>
    </SearchWrapper>
  );
};
