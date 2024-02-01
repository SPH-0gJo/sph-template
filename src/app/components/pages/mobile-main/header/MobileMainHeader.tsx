import React, { useEffect, useState } from 'react';
import { MobileHeaderButton } from 'app/components/pages/mobile-main/header/MobileHeaderButton';
import { useMobilePageStore } from 'app/stores/mobile/mobilePages';
import styled from 'styled-components';

export const MobileHeader = styled.header`
  background-color: var(--dark-surface-level-2);
  height: 3.625rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  grid-area: header / aside-start;
  display: grid;
  grid-template-columns:  0.5fr 1fr 2fr;
  align-items: center;
  padding: 0.625rem 1.25rem;
  color:white;
  z-index: 2;
`;

export const CustomEm = styled.button`
    
  font-size: 2rem;
  margin-right: 0.88rem;
  gap: 0.5rem;
  color: var(--white);
  border: none;
  background-color: transparent;
  border-radius: 0.25rem;
`;

export const MobileMainHeader = () => {
  const { currentPage, menuOpen, setMenuOpen } = useMobilePageStore();
  const [ title, setTitle ] = useState<string>('GEOLAB')

  useEffect(() => {
    switch (currentPage){
      case 'MAIN':
        setTitle('GEOLAB')
        break;
    }
  }, [currentPage]);

  return (
    <MobileHeader>
      <CustomEm onClick={()=>setMenuOpen(!menuOpen)} className={currentPage === 'MAIN' ? 'icon-burger-menu' : 'icon-arrow-left-large'} />
      <span>{title}</span>
      <MobileHeaderButton />
    </MobileHeader>
  );
};
