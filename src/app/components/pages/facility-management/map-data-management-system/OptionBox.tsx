import React, { useState } from 'react';
import styled from 'styled-components';

const OptionLayout = styled.div`
  display: flex;
  width: 18.75rem;
  height: 33.0625rem;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: var(--white, #fff);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 7.25rem;
  right: 5.25rem;
`;
const OptionHeader = styled.div`
  display: flex;
  padding: 0.9375rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid var(--divider, rgba(0, 0, 0, 0.12));
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
`;
const DrawButton = styled.button`
  display: flex;
  height: 2.75rem;
  color: var(--black);
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex: 1 0 0;
  border-radius: 0.375rem;
  background-color: var(--white);

  &.selected {
    color: var(--white);
    background-color: var(--light-secondary-origin);
  }

  &:hover {
    color: var(--black);
    background: var(--light-secondary-a16);
  }
`;
const OptionBody = styled.div`
  display: flex;
  height: 22.9375rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
  flex-shrink: 0;
  align-self: stretch;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;
const CheckBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
`;
const CheckBoxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;
const CheckBox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
`;
export const OptionBox = () => {
  const [drawingType, setDrawingType] = useState('radius');

  return (
    <OptionLayout>
      <OptionHeader>상세 옵션</OptionHeader>
      <ButtonWrapper>
        <DrawButton
          key={'region'}
          className={drawingType === 'region' ? 'selected' : ''}
          onClick={() => {
            setDrawingType('region');
          }}
        >
          영역 그리기
        </DrawButton>
        <DrawButton
          key={'radius'}
          className={drawingType === 'radius' ? 'selected' : ''}
          onClick={() => {
            setDrawingType('radius');
          }}
        >
          반경 그리기
        </DrawButton>
      </ButtonWrapper>
      <OptionBody>
        <CheckBoxContainer>
          <b>구분</b>
          <CategoryWrapper>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                공급관
              </CheckBoxItem>
              <CheckBoxItem>
                <CheckBox />
                내관
              </CheckBoxItem>
            </CheckBoxColumn>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                본관
              </CheckBoxItem>
              <CheckBoxItem>
                <CheckBox />
                사용자 공급관
              </CheckBoxItem>
            </CheckBoxColumn>
          </CategoryWrapper>
        </CheckBoxContainer>
        <CheckBoxContainer>
          <b>압력</b>
          <CategoryWrapper>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                고압
              </CheckBoxItem>
              <CheckBoxItem>
                <CheckBox />
                저압
              </CheckBoxItem>
            </CheckBoxColumn>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                중압
              </CheckBoxItem>
            </CheckBoxColumn>
          </CategoryWrapper>
        </CheckBoxContainer>
        <CheckBoxContainer>
          <b>재질</b>
          <CategoryWrapper>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                PE
              </CheckBoxItem>
              <CheckBoxItem>
                <CheckBox />
                SP
              </CheckBoxItem>
            </CheckBoxColumn>
            <CheckBoxColumn>
              <CheckBoxItem>
                <CheckBox />
                PLP 본관
              </CheckBoxItem>
            </CheckBoxColumn>
          </CategoryWrapper>
        </CheckBoxContainer>
      </OptionBody>
    </OptionLayout>
  );
};
