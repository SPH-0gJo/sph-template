import React, { useEffect, useState } from 'react';
import { Map } from 'maplibre-gl';
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

interface CheckBoxItem {
  id: string;
  name: string;
}

const pipeOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: [
      { id: 'supply', name: '공급관' },
      { id: 'main', name: '본관' },
      { id: 'inner', name: '내관' },
      { id: 'user', name: '사용자 공급관' },
    ],
  },
  {
    category: '압력',
    items: [
      { id: 'HP', name: '고압' },
      { id: 'MA', name: '중압' },
      { id: 'LP', name: '저압' },
    ],
  },
  {
    category: '재질',
    items: [
      { id: '20', name: 'PE' },
      { id: '30', name: 'PLP본관' },
      { id: '40', name: 'SP' },
    ],
  },
];

const valveOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: [
      { id: 'supply', name: '공급관' }, // supply
      { id: 'main', name: '본관' }, // main
      { id: 'inner', name: '내관' }, // inner
      { id: 'user', name: '사용자 공급관' }, // user
    ],
  },
  {
    category: '압력',
    items: [
      { id: 'HP', name: '고압' },
      { id: 'MA', name: '중압' },
      { id: 'LP', name: '저압' },
    ],
  },
  {
    category: '형식',
    items: [
      // Todo : id 확인 필요/GIS_VV_FORM_CD
      { id: '10', name: '볼밸드' },
      { id: '20', name: '용접형 매몰볼밸드' },
      { id: '30', name: '용접형 매몰볼밸드(ONE-PURGE)' },
      { id: '40', name: '용접형 매몰볼밸드(TWO-PURGE)' },
      { id: '50', name: '절연 매몰볼밸드' },
      { id: '60', name: 'BOX형 매몰볼밸드' },
    ],
  },
];
const governorOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: [
      // Todo : id 확인 필요
      { id: '2331', name: '공급관' },
      { id: '2320', name: '본관' },
      { id: '2323', name: '내관' },
      { id: '2322', name: '사용자 공급관' },
    ],
  },
];

const testBoxOptions: Array<OptionContent> = [
  {
    category: '구분',
    items: [
      // Todo : id 확인 필요
      { id: '2331', name: '공급관' },
      { id: '2320', name: '본관' },
      { id: '2323', name: '내관' },
      { id: '2322', name: '사용자 공급관' },
    ],
  },
  {
    category: '압력',
    items: [
      { id: '2240', name: '고압' },
      { id: '2241', name: '중압' },
      { id: '2242', name: '저압' },
      { id: '2243', name: '통합' },
      { id: '224', name: '본딩' },
      { id: '2245', name: '케이싱' },
      { id: '2246', name: '사용시설' },
    ],
  },
  {
    category: '방식',
    items: [
      // Todo : id 확인 필요
      { id: '2240', name: '희생양극식' },
      { id: '2240', name: '외부전원식' },
    ],
  },
];

interface OptionBoxProps {
  layerGroupId: GeoDataKeys | undefined;
  appMap: Map | null;
}

interface OptionContent {
  category: string;
  items: Array<CheckBoxItem>;
}

const pipeCheckIds = [
  'supply',
  'main',
  'inner',
  'user',
  '2011',
  '2021',
  '2031',
  '2010',
  '2020',
  '2030',
  '2013',
  '2323',
  '2023',
  '2012',
  '2022',
  '2032',
  'LP',
  'MA',
  'HP',
  '20',
  '30',
  '40',
];

const valveCheckIds = [
  'supply',
  'main',
  'inner',
  'user',
  '2311',
  '2321',
  '2331',
  '2310',
  '2320',
  '2330',
  '2313',
  '2323',
  '2333',
  '2312',
  '2322',
  '2332',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  'LP',
  'MA',
  'HP',
];

export const OptionBox = (props: OptionBoxProps) => {
  const [drawingType, setDrawingType] = useState('radius');
  const [optionList, setOptionList] = useState<Array<OptionContent>>(pipeOptions);
  const [checkedIds, setCheckedIds] = useState<string[]>(pipeCheckIds);

  const handleCheckBox = (id: string) => {
    const isChecked = checkedIds.includes(id);
    let updatedIds = isChecked ? checkedIds.filter((checkedId) => checkedId !== id) : [...checkedIds, id];
    const main = ['supply', 'main', 'inner', 'user'];
    if (props.layerGroupId == 'pl') {
      const pipeMainCode: { [key: string]: string[] } = {
        supply: ['2011', '2021', '2031'],
        main: ['2010', '2020', '2030'],
        inner: ['2013', '2323', '2023'],
        user: ['2012', '2022', '2032'],
      };

      if (main.includes(id)) {
        updatedIds = isChecked
          ? updatedIds.filter((checkedId) => !pipeMainCode[id].includes(checkedId))
          : [...updatedIds, ...pipeMainCode[id]];
      }
      console.log(updatedIds);
      props.appMap?.setFilter('pl_ly', [
        'all',
        ['match', ['get', 'gis_pl_ty_cd'], [...updatedIds], true, false],
        [
          'any',
          ['match', ['get', 'gis_pres_cd'], [...updatedIds], true, false],
          ['match', ['get', 'gis_pl_div_cd'], [...updatedIds], true, false],
        ],
      ]);
    }
    if (props.layerGroupId == 'vv') {
      const valveMainCode: { [key: string]: string[] } = {
        supply: ['2311', '2321', '2331'],
        main: ['2310', '2320', '2330'],
        inner: ['2313', '2323', '2333'],
        user: ['2312', '2322', '2332'],
      };

      if (main.includes(id)) {
        updatedIds = isChecked
          ? updatedIds.filter((checkedId) => !valveMainCode[id].includes(checkedId))
          : [...updatedIds, ...valveMainCode[id]];
      }

      props.appMap?.setFilter('vv_ly', [
        'all',
        ['match', ['get', 'gis_vv_typ_cd'], [...updatedIds], true, false],
        [
          'any',
          ['match', ['get', 'gis_vv_form_cd'], [...updatedIds], true, false],
          ['match', ['get', 'pres_cd'], [...updatedIds], true, false],
        ],
      ]);
    }

    setCheckedIds(updatedIds);
  };

  useEffect(() => {
    const optionSelect = {
      pl: pipeOptions,
      vv: valveOptions,
      rglt: governorOptions,
      tb: testBoxOptions,
    };

    const checkOptionSelect = {
      pl: pipeCheckIds,
      vv: valveCheckIds,
      rglt: pipeCheckIds,
      tb: valveCheckIds,
    };
    const currentOption = optionSelect[props.layerGroupId as GeoDataKeys];
    const currentCheckList = checkOptionSelect[props.layerGroupId as GeoDataKeys];
    setOptionList(currentOption);
    setCheckedIds(currentCheckList);
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
          <>
            <CheckBoxContainer key={index}>
              <b>{option.category}</b>
              <CategoryWrapper>
                {option.items.map((item, innerIndex) => (
                  <CheckBoxWrapper key={innerIndex}>
                    <CheckBox
                      id={item.id}
                      checked={checkedIds.includes(item.id)}
                      onChange={() => handleCheckBox(item.id)}
                    />
                    <label>{item.name}</label>
                  </CheckBoxWrapper>
                ))}
              </CategoryWrapper>
            </CheckBoxContainer>
          </>
        ))}
      </OptionBody>
    </OptionLayout>
  );
};
