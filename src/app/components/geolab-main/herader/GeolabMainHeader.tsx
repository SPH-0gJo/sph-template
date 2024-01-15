import React from 'react';
import { Search } from 'app/components/common-ui/index';
import { Header } from 'shared/styles/styled/common';

interface GeolabMainHeaderProps {
  setInputText: (text: string | undefined) => void;
}

export const GeolabMainHeader = (props: GeolabMainHeaderProps) => {
  return (
    <Header>
      <em className='icon-burger-menu' />
      <Search setInputText={(text) => props.setInputText(text)} />
    </Header>
  );
};
