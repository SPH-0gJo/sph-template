import React from 'react';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { useMobilePageStore } from 'app/stores/mobile/mobilePages';
import styled from 'styled-components';

export const ButtonBox = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const CustomBtn = styled.button`
  font-size: 1.25rem;
  margin-left: 1.2rem;
  gap: 0.5rem;
  color: var(--white);
  border: none;
  background-color: transparent;
  border-radius: 0.25rem;
`;

export const MobileHeaderButton = () => {
  const { currentPage } = useMobilePageStore();
  const { setMapButtonAction } = useMobileMapStore();
    return(
      <ButtonBox>
        <CustomBtn onClick={()=>setMapButtonAction('reset')} className={currentPage === 'MAIN' ? 'icon-map-reset' : 'icon-arrow-left-large'} />
        <CustomBtn onClick={()=>setMapButtonAction('compass')} className={currentPage === 'MAIN' ? 'icon-compass' : 'icon-arrow-left-large'} />
        <CustomBtn onClick={()=>setMapButtonAction('position')} className={currentPage === 'MAIN' ? 'icon-map-position' : 'icon-arrow-left-large'} />
      </ButtonBox>
    );
}