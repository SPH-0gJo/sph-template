import React from 'react';
import { DataController } from 'app/components/pages/visualization-management/screen-grid/DataController';
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
const SeperatedLine = styled.hr`
  width: 100%;
  color: gray;
`;
const InfoBottom = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.3rem 0 0.3rem;
`;

export const ScreenGridInfo = () => {
  return (
    <InfoWrapper>
      <InfoTop>
        <InfoTitle>2024 Seoul Public Parking Rates</InfoTitle>
        <InfoDetail>2024 서울시 공영 노상, 노외 주차장 운영 금액 통계</InfoDetail>
        <SeperatedLine />
      </InfoTop>
      <InfoBottom>
        <DataController />
      </InfoBottom>
    </InfoWrapper>
  );
};
