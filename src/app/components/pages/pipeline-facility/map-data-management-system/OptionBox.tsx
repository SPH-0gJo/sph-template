import React, { useEffect, useState } from 'react';
import { GeoDataKeys } from 'shared/fixtures/pipeline';
import styled from 'styled-components';

const OptionLayout = styled.div`
  display: flex;
  width: 18.75rem;
  height: 40rem;
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
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 설정 */
  flex-direction: row;
  gap: 1rem;
  flex: 1 0 0;
`;
const CheckBoxWrapper = styled.div`
  width: calc(50% - 10px);
  align-items: flex-start;
  display: flex;
  gap: 0.625rem;
`;
const CheckBox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  width: 1.125rem;
  height: 1.125rem;
`;

const pipeOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: ['공급관', '본관', '내관', '사용자 공급관'],
  },
  {
    category: '압력',
    items: ['고압', '중압', '저압'],
  },
  {
    category: '재질',
    items: ['PE', 'PLP본관', 'SP'],
  },
];

const valveOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: ['공급관', '본관', '내관', '사용자 공급관'],
  },
  {
    category: '압력',
    items: ['고압', '중압', '저압'],
  },
  {
    category: '형식',
    items: [
      '볼밸드',
      '용접형 매몰볼밸드',
      '용접형 매몰볼밸드(ONE-PURGE)',
      '용접형 매몰볼밸드(TWO-PURGE)',
      '절연 매몰볼밸드',
      'BOX형 매몰볼밸드',
    ],
  },
];
const governorOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: ['공급관', '본관', '내관', '사용자 공급관'],
  },
  {
    category: '압력',
    items: ['고압', '중압', '저압'],
  },
  {
    category: '재질',
    items: ['PE', 'PLP본관', 'SP'],
  },
];

const testBoxOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: ['공급관', '본관', '내관', '사용자 공급관'],
  },
  {
    category: '압력',
    items: ['고압', '중압', '저압'],
  },
  {
    category: '방식',
    items: ['희생양극식', '외부전원식'],
  },
];

interface OptionBoxProps {
  layerGroupId: GeoDataKeys | undefined;
}

interface OptionContent {
  category: string;
  items: Array<string>;
}

const OptionCategory = ({ category, items }: OptionContent) => {
  return (
    <CheckBoxContainer>
      <b>{category}</b>
      <CategoryWrapper>
        {items.map((item, index) => (
          <CheckBoxWrapper key={index}>
            <CheckBox />
            <label>{item}</label>
          </CheckBoxWrapper>
        ))}
      </CategoryWrapper>
    </CheckBoxContainer>
  );
};

export const OptionBox = (props: OptionBoxProps) => {
  const [drawingType, setDrawingType] = useState('radius');
  const [optionList, setOptionList] = useState<Array<OptionContent>>(pipeOptions);

  useEffect(() => {
    const optionSelect = {
      pl: pipeOptions,
      vv: valveOptions,
      rglt: governorOptions,
      tb: testBoxOptions,
    };
    const currentOption = optionSelect[props.layerGroupId as GeoDataKeys];
    setOptionList(currentOption);
  }, [props]);
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
        {optionList?.map((option, index) => (
          <OptionCategory category={option.category} items={option.items} key={index} />
        ))}
      </OptionBody>
    </OptionLayout>
  );
};
