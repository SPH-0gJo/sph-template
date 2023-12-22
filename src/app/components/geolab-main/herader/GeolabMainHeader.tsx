import React from 'react';
import styled from 'styled-components';

import { Search } from 'app/components/common-ui/index';

const Header = styled.header`
  background-color: var(--light-surface-level-1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.63rem 1.25rem;
  em {
    font-size: 1.5rem;
    margin-right: 0.88rem;
  }
`;

interface GeolabMainHeaderProps {
  setInputText: (text: string) => void;
}

export const GeolabMainHeader = (props: GeolabMainHeaderProps) => {
  return (
    <Header>
      <em className='icon-burger-menu' />
      <Search setInputText={(text) => props.setInputText(text)} />
    </Header>
  );
};
