import React from 'react';
import { Search } from 'app/components/common-ui';
import { Header } from 'shared/styles/styled/common';

interface GeolabMainHeaderProps {
  setInputText?: (text: string | undefined) => void;
}

export const GeolabMainHeader = (props: GeolabMainHeaderProps) => {
  const { setInputText } = props;
  return (
    <Header>
      <em className='icon-burger-menu' />
      {setInputText && <Search setInputText={(text) => setInputText(text)} />}
    </Header>
  );
};
