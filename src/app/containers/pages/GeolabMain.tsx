import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GeolabMainHeader } from 'app/components/geolab-main/herader/GeolabMainHeader';
import { GeolabMainAside } from 'app/components/geolab-main/aside/GeolabMainAside';
import { GeolabMainContents } from 'app/components/geolab-main/contents/GeolabMainContents';

import { useCommonStore } from 'app/stores/menuItems';

const LandingPage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 21.25rem 1fr;
  grid-template-rows: 5.6rem 1fr;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-areas:
    'aside header'
    'aside content';
`;

export const GeolabMain = () => {
  const { menuItems, fetch } = useCommonStore();
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch();
    setSearchText('');
  }, []);

  return (
    <LandingPage>
      <GeolabMainHeader setInputText={(text) => setSearchText(text)} />
      <GeolabMainAside data={{ menuItems }} />
      <GeolabMainContents data={{ menuItems, searchText }} />
    </LandingPage>
  );
};
