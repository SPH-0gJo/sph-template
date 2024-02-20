import React from 'react';
import { contoursColorBands } from 'app/components/pages/visualization-management/contour-layer/contour.layer';
import { DataController } from 'app/components/pages/visualization-management/contour-layer/DataController';
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
const InfoBottom = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.3rem 0 0.3rem;
`;

export const ContourInfo = () => {
  return (
    <InfoWrapper>
      <InfoTop>
        <InfoTitle>2021 US COVID-19</InfoTitle>
        <InfoDetail>2021 미국 코로나 바이러스 통계</InfoDetail>
        <div>
          <ColorBar>
            {contoursColorBands.map(({ color }, idx) => {
              return <div key={`contour_color_${idx}`} style={{ backgroundColor: `rgb(${[...color]})` }}></div>;
            })}
          </ColorBar>
          <ColorTag>
            <label></label>
            <label>1</label>
            <label>10</label>
            <label>100</label>
            <label>500</label>
            <label>2000</label>
          </ColorTag>
        </div>
      </InfoTop>
      <InfoBottom>
        <DataController />
      </InfoBottom>
    </InfoWrapper>
  );
};
