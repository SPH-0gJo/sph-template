import React from 'react';
import { contoursColorBands } from 'app/components/pages/visualization-management/contour-layer/contour.layer';
import { DataController } from 'app/components/pages/visualization-management/contour-layer/DataController';
import { legendGroups } from 'app/components/pages/visualization-management/heat-map/heatmap.layer';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  display: flex;
  width: 25.625rem;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.9375rem;
  border-radius: 0.625rem;
  background: var(--white);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 7.25rem;
  left: 1.25rem;
  user-select: none;
  padding: 1.8rem 1.3rem;
`;
const InfoTop = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const InfoTitle = styled.label`
  font-size: 1.5rem;
  font-weight: var(--text-weight-bold);
  line-height: 1.5;
`;
const InfoDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoDetail = styled.label`
  font-size: 1rem;
  font-weight: var(--text-weight-semibold);
  line-height: 1.75rem;
`;
const ColorBar = styled.div`
  display: flex;
  height: 1.4rem;

  & div {
    width: 16.666666666666668%;
    height: 100%;
  }
`;
const ColorTag = styled.div`
  display: flex;
  height: 100%;

  & label {
    width: 16.666666666666668%;
  }
`;

export const HeatMapInfo = () => {
  return (
    <InfoWrapper>
      <InfoTop>
        <InfoTitle>2024 Seoul Bus Stop</InfoTitle>
        <InfoDetailWrapper>
          <InfoDetail>서울특별시 교통정보과에서 제공하는 버스정류소 위치 정보</InfoDetail>
          <InfoDetail>👆 버스정류장을 누르면 상세정보를 확인할 수 있어요!</InfoDetail>
        </InfoDetailWrapper>
        <div>
          <ColorBar>
            {legendGroups.map((rgb, idx) => {
              const border = idx === 0 ? 'black 1px solid' : 'none';
              return <div key={`contour_color_${idx}`} style={{ backgroundColor: rgb, border: border }}></div>;
            })}
          </ColorBar>
          <ColorTag>
            {legendGroups.map((rgb, idx) => {
              return <label key={`contour_tag_${idx}`}>Level {idx + 1}</label>;
            })}
          </ColorTag>
        </div>
      </InfoTop>
    </InfoWrapper>
  );
};
