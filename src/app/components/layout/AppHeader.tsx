import React from 'react';

import { Header } from 'shared/styles/styled/common';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'app/components/common/Breadcrumb';

const HomeLink = styled(Link)`
  height: 5.625rem;
  color: var(--light-text-primary);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 5rem;
    height: 2rem;
    margin-right: 0.77rem;
  }
  span {
    font-size: 1.81038rem;
    font-style: normal;
    font-weight: var(--text-weight-bold);
    line-height: normal;
  }
`;
export const AppHeader = () => {
  return (
    <Header>
      <HomeLink to='/'>
        <img src='/assets/images/logo_dark.svg' alt='Geolab Logo' />
        <span>GEOLAB</span>
      </HomeLink>
      <Breadcrumb />
    </Header>
  );
};
