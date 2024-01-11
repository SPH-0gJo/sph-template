import React, { useEffect, useState } from 'react';
import { ToolboxButtonWrapper, ToolboxButton } from 'shared/styles/styled/common';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import styled from 'styled-components';

import { measureTypes } from 'shared/constants/types';

interface StyledProps {
  $position: number[] | undefined;
}

const CalculationBox = styled.div<StyledProps>`
  position: fixed;
  top: ${(props) => (props.$position ? `${props.$position[0]}px` : 0)};
  left: ${(props) => (props.$position ? `${props.$position[1]}px` : 0)};
  border-radius: 0.3rem;
  padding: 1rem;
  background-color: var(--light-surface-level-0);
  border: 0.08rem solid gray;
  width: 6rem;
  height: 4rem;
  display: ${(props) => (props.$position ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MeasureButtons = () => {
  const { measureType, measuredValue, setMeasureType } = useMapOptionsStore();
  const [calculationBoxPosition, setCalculationBoxPosition] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    measureType === 'none' && setCalculationBoxPosition(undefined);
  }, [measureType]);

  function getCalculationBoxPosition(e: React.MouseEvent, measureType: measureTypes) {
    if (!e.currentTarget || measureType === 'none') return;
    const { top, left: currentLeft, width } = e.currentTarget.getBoundingClientRect();
    console.log(currentLeft - width * 1.8);
    const left = currentLeft - width * 1.55; // 0.5 is right margin
    setCalculationBoxPosition([top, left]);
    setMeasureType(measureType);
  }

  return (
    <>
      <ToolboxButtonWrapper>
        <ToolboxButton
          className={`${measureType === 'radius' ? 'selected' : ''}`}
          onClick={(e) => getCalculationBoxPosition(e, 'radius')}
          title='반경'
          disabled
        >
          <em className='icon-map-circle' />
        </ToolboxButton>
        <ToolboxButton
          className={`${measureType === 'distance' ? 'selected' : ''}`}
          onClick={(e) => getCalculationBoxPosition(e, 'distance')}
          title='거리'
        >
          <em className='icon-map-ruler' />
        </ToolboxButton>
        <ToolboxButton
          className={`${measureType === 'area' ? 'selected' : ''}`}
          onClick={(e) => getCalculationBoxPosition(e, 'area')}
          title='면적'
          disabled
        >
          <em className='icon-map-polygon' />
        </ToolboxButton>
      </ToolboxButtonWrapper>
      {/* <CalculationBox className='body' $position={calculationBoxPosition}>*/}
      {/*  <p>{measuredValue}</p>*/}
      {/* </CalculationBox>*/}
    </>
  );
};
