import React, { useEffect } from 'react';
import { useNaverRoadViewStore } from 'app/stores/map/naverRoadView';
import { NAVER_MAP_API_URL } from 'shared/constants/varibales';
import { importExternalScript } from 'shared/modules/app.utils';
import styled from 'styled-components';

const NaverRoadViewMap = styled.div`
  position: relative;
  background-color: rgb(28, 32, 37);
  border-radius: 8px;
  border: 1px solid rgb(67, 77, 91);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 12px;
  padding: 24px;
`;

/*
 * To-do
 *  This component cannot find `naver` namespace with typescript, it will fix this issue.
 * */
export const GeolabNaverRoadView = () => {
  const { naverRoadViewMap, naverRoadViewCoords, naverRoadViewSize, setNaverRoadViewCoords, setNaverRoadViewSize } =
    useNaverRoadViewStore();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let naverMap: naver.maps.Map | null = null;
  function initNaverMap() {
    if (!naverRoadViewCoords || !naverRoadViewSize) return;
    const { lng, lat } = naverRoadViewCoords;
    const { width, height } = naverRoadViewSize;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const position = new naver.maps.LatLng(lat, lng);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const size = new naver.maps.Size(width, height);
    const panoramaOptions = { position, size, pov: { pan: -135, tilt: 29, fov: 100 }, flightSpot: false };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    naverMap = new naver.maps.Panorama('naverMap', panoramaOptions);
  }
  useEffect(() => {
    if (naverMap) initNaverMap();
    else importExternalScript(NAVER_MAP_API_URL, initNaverMap);
  }, [naverRoadViewMap, naverRoadViewCoords]);

  useEffect(() => {
    return () => {
      setNaverRoadViewCoords(undefined);
      setNaverRoadViewSize(undefined);
    };
  }, []);

  return <NaverRoadViewMap id='naverMap' />;
};
