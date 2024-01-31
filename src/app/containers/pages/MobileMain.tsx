import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileAside } from 'app/components/pages/mobile-main/aside/MobileAside.';
import { MobileMainHeader } from 'app/components/pages/mobile-main/header/MobileMainHeader';
import { MapViewer } from 'app/components/pages/mobile-main/map/MapViewer';
import { useMobilePageStore } from 'app/stores/mobile/mobilePages';
import styled from 'styled-components';

const LandingPage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:  minmax(auto, 500px) 1fr;
  grid-template-rows: 3.625rem 1fr;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-areas:
    'aside header'
    'aside content';
`;

export const MobileMain = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useMobilePageStore();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      alert('모바일 전용 페이지 입니다.')
      navigate('/geolab');
    }
    setCurrentPage('MAIN');
  }, []);

  return (
    <LandingPage>
      <MobileAside/>
      <MobileMainHeader/>
      <MapViewer/>
    </LandingPage>
  );
};
