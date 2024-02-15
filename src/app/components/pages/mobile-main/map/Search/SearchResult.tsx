import React from 'react';
import { searchResultType } from 'app/components/pages/mobile-main/map/Search/SearchView';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import styled from 'styled-components';

const SearchResultWrap = styled.div`
    //background-color: var(--dark-surface-level-2);
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const SearchResultInfo = styled.div`
    width: 100%;
    height: 4rem;
    background-color: var(--black-a12);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoDataResult = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface SearchResultProps {
  searchResult: Array<searchResultType>;
}

export const SearchResult = (props: SearchResultProps) => {
  const { mapSearch } = useMobileMapStore();

  console.log(props.searchResult);
  return (
    <SearchResultWrap>
      {props.searchResult?.length >= 1 ?
        <SearchResultInfo>
          {props.searchResult.map((result: searchResultType, key: number) => (
            <span key={key}>{result.roadAddress}</span>
          ))}
        </SearchResultInfo>
        :
        <>
          {mapSearch ? <NoDataResult> 검색 결과가 없습니다.</NoDataResult> :
            <NoDataResult style={{ opacity: 0.1 }}> 검색 결과 표시</NoDataResult>}
        </>
      }
    </SearchResultWrap>
  );
};