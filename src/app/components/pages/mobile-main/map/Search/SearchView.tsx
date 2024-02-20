import React, { useState } from 'react';
import { mobileApi } from 'app/api/mobile.api';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import styled from 'styled-components';

const SearchViewMain = styled.div`
  width: 100%;
  height: 3rem;
  background-color: var(--white);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: fixed;
  top: 3.625rem;
  transition: all 0.8s;
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.div`
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: 5fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

const Input = styled.input`
  position: relative;
  width: 20rem;
  height: 2rem;
  border-radius: 0.625rem;
  text-align: left;
  justify-self: center;
  padding-left: 1rem;
`;

const Button = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.625rem;
  background-color: var(--dark-surface-level-2);
  color: var(--white);
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-self: center;
`;

export interface searchResultType {
  addressElements: Array<object>;
  distance: string;
  englishAddress: string;
  jibunAddress: string;
  roadAddress: string;
  x: string;
  y: string;
}

export const SearchView = () => {
  const { mapSearchView, setMapSearchView, setMapCenter } = useMobileMapStore();
  const [searchWord, setSearchWord] = useState<string>('');
  const [param, setParam] = useState<string>('');

  const search = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toUpperCase() === 'ENTER') {
      if (param === event.currentTarget.value) return;
      setParam(event.currentTarget.value);
      const result = await mobileApi.vWorldApiG(event.currentTarget.value);
      setMapCenter([result.response.result.point.y, result.response.result.point.x]);
    } else if (event.code.toUpperCase() === 'BACKSPACE' && event.currentTarget.value === '') {
      setSearchWord(event.currentTarget.value);
    }
  };

  const transformValue = mapSearchView ? 'translateY(0)' : 'translateY(-100%)';
  return (
    <SearchViewMain style={{ transform: transformValue }}>
      <SearchHeader>
        <Input
          placeholder='검색어를 입력해 주세요.'
          value={searchWord}
          onChange={(event) => setSearchWord(event.currentTarget.value)}
          onKeyDown={(event) => search(event)}
        />
        <Button>
          <em
            className='icon-close'
            onClick={() => {
              setMapSearchView(false);
              setSearchWord('');
            }}
          />
        </Button>
      </SearchHeader>
    </SearchViewMain>
  );
};
