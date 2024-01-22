import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GeolabMenu } from 'app/components/pages/geolab-main/aside/GeolabMenu';
import { MainMenu } from 'shared/constants/types/types';
import styled from 'styled-components';

const Aside = styled.aside`
  font-family: var(--font-primary);
  background: var(--dark-surface-level-2);
  grid-area: aside;
  padding: 0 1.875rem 1.4375rem 1.875rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const AsideHeader = styled.div`
  cursor: pointer;
  height: 5.625rem;
  color: var(--dark-text-primary);
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

const MenuItemBar = styled.div`
  overflow-y: auto;
  flex: 1;
  overflow-y: auto;
`;

const MenuItems = styled.ul`
  text-shadow: 0px 1px 1px rgba(44, 44, 44, 0.02);
`;

const AsideFooter = styled.div`
  color: var(--dark-text-secondary);
  padding: 1.25rem;
  margin-top: auto;
`;

interface GeolabMainAsideData {
  menuItems: MainMenu[];
}

interface GeolabMainAsideProps {
  data: GeolabMainAsideData;
}

export const GeolabMainAside = (props: GeolabMainAsideProps) => {
  const navigator = useNavigate();
  const { menuItems } = props.data;
  return (
    <Aside>
      <AsideHeader onClick={() => navigator('/geolab')}>
        <img src='/assets/images/logo.svg' alt='Geolab Logo' />
        <span>GEOLAB</span>
      </AsideHeader>
      <MenuItemBar>
        <MenuItems className={'h6'}>
          {menuItems.map((menuItem) => {
            const { id, children } = menuItem;
            if (!children) return;
            return <GeolabMenu data={{ menuItem }} key={id} />;
          })}
        </MenuItems>
      </MenuItemBar>
      <AsideFooter className={'caption'}>
        <p>담당자:&nbsp;유경수</p>
        <p>전화:&nbsp;02-785-9910</p>
        <p>메일:&nbsp;help@sphinfo.com</p>
        <p>&copy;&nbsp;SPH,&nbsp;Inc.&nbsp;All&nbsp;Rights&nbsp;Reserved.</p>
      </AsideFooter>
    </Aside>
  );
};
