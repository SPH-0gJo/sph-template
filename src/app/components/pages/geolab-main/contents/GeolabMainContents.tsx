import React, { useMemo } from 'react';
import { GeolabItemCard } from 'app/components/pages/geolab-main/contents/GeolabItemCard';
import { GeolabMenuItems } from 'shared/constants/types/types';
import styled from 'styled-components';

const Main = styled.main`
  background-color: var(--light-surface-level-2);
  grid-area: content;
  padding: 2.5rem 2.5rem 0 2.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentsHeader = styled.section`
  border-bottom: 1px solid var(--light-text-disabled);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ContentTitle = styled.div`
  padding: 0.625rem 0rem 1.875rem 0rem;
  p:nth-child(1) {
    color: #000;
  }
  p:nth-child(2) {
    color: #4a4a4a;
    text-shadow: 0px 1px 1px rgba(44, 44, 44, 0.02);
  }
`;

const MainContent = styled.div`
  padding-top: 2.5rem;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ItemCardSection = styled.section`
  padding-bottom: 3.75rem;
  h4 {
    margin-bottom: 0.89rem;
  }
`;

const ItemCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.31rem;
`;

interface GeolabMainContentData {
  menuItems: GeolabMenuItems[];
  searchText?: string;
}

interface GeolabMainContentsProps {
  data: GeolabMainContentData;
}

export const GeolabMainContents = (props: GeolabMainContentsProps) => {
  const { menuItems, searchText } = props.data;

  const filteredMenuItems = useMemo(() => {
    const copied: GeolabMenuItems[] = JSON.parse(JSON.stringify(menuItems));
    if (!searchText) return copied.filter((e) => e.children);
    return copied
      .map((item) => {
        const { children } = item;
        if (!children) return undefined;
        item.children = children.filter((e) => e.name.includes(searchText));
        if (!item.children.length) return undefined;
        return item;
      })
      .filter(Boolean) as GeolabMenuItems[];
  }, [searchText, menuItems]);

  return (
    <Main>
      <ContentsHeader>
        <ContentTitle>
          <p className={'h3'}>SPH&nbsp;오픈소스&nbsp;GIS&nbsp;연구소</p>
          <p className={'body'}>
            오픈소스&nbsp;기반&nbsp;GIS&nbsp;데이터&nbsp;활용&nbsp;예제를&nbsp;경험해&nbsp;보세요.
          </p>
        </ContentTitle>
      </ContentsHeader>
      <MainContent>
        {filteredMenuItems.map(({ id, name, children }) => {
          if (!children) return;
          return (
            <ItemCardSection key={id}>
              <h4>{name}</h4>
              <ItemCardWrapper>
                {children.map((subMenu, index) => (
                  <GeolabItemCard data={{ subMenu }} key={index} />
                ))}
              </ItemCardWrapper>
            </ItemCardSection>
          );
        })}
      </MainContent>
    </Main>
  );
};
