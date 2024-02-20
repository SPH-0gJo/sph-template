import React from 'react';
import { DataController } from 'app/components/pages/visualization-management/hexagon-layer/DataController';
import { hexagonColorRange } from 'app/components/pages/visualization-management/hexagon-layer/hexagon.layer';
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
  padding: 0.3rem 0.5rem 0 0.5rem;
  justify-content: space-between;
`;

const InfoBottom = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.3rem 0 0.3rem;
`;

export const HexagonInfo = () => {
  return (
    <InfoWrapper>
      <InfoTop>
        <InfoTitle>2024 Starbucks Korea Store</InfoTitle>
        <InfoDetail>2024 스타벅스 한국 매장 크롤링 데이터 집계</InfoDetail>
        <div>
          <ColorBar>
            {hexagonColorRange.map((color, idx) => {
              return <div key={`hexagon_color_${idx}`} style={{ backgroundColor: `rgb(${[...color]})` }}></div>;
            })}
          </ColorBar>
          <ColorTag>
            <label>Fewer</label>
            <label>More</label>
          </ColorTag>
        </div>
      </InfoTop>
      <InfoBottom>
        <DataController />
      </InfoBottom>
    </InfoWrapper>
  );
};
