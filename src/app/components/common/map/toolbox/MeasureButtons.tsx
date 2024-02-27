import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { useMapMeasureStore } from 'app/stores/mapMeasure';
import { measureTypes } from 'shared/constants/types/types';
import { ToolboxButton, ToolboxButtonWrapper } from 'shared/styles/styled/common';
import styled from 'styled-components';

interface StyledProps {
  $position: number[] | undefined;
}

const CalculationBox = styled.div<StyledProps>`
  position: fixed;
  top: ${(props) => (props.$position ? `${props.$position[0]}px` : 0)};
  right: ${(props) => (props.$position ? `${props.$position[1]}px` : 0)};
  border-radius: 0.3rem;
  padding: 1rem;
  width: auto;
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--light-surface-level-0);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
`;

export const MeasureButtons = () => {
  const [width, setWidth] = useState(window.innerWidth - (window.innerWidth - 55));
  const [calculationBoxPosition, setCalculationBoxPosition] = useState<number[] | undefined>(undefined);
  const [measureSum, setMeasureSum] = useState(0);
  const [measureUnit, setMeasureUnit] = useState('');
  const { measureType, distanceValue, setMeasureType, setDistanceSource, setDistanceLayer, setDistanceValue } =
    useMapMeasureStore();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - (window.innerWidth - 55));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      resetClick();
      setDistanceValue([]);
      setMeasureType('none');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (measureType === 'none' || !calculationBoxPosition) return;
    setCalculationBoxPosition([calculationBoxPosition[0], width]);
  }, [width]);

  useEffect(() => {
    const valueFunc: { [key: string]: Array<number> } = {
      none: [],
      radius: [],
      distance: distanceValue,
      area: [],
    };

    let value = 0;
    valueFunc[measureType].forEach((n) => (value += n));
    setMeasureSum(value);

    const unitFunc: { [key: string]: string } = {
      none: '',
      radius: '',
      distance: 'km',
      area: '',
    };
    setMeasureUnit(unitFunc[measureType]);
  }, [distanceValue, measureType]);

  function getCalculationBoxPosition(e: React.MouseEvent, type: measureTypes) {
    if (!e.currentTarget || type === 'none') return;
    const { top } = e.currentTarget.getBoundingClientRect();
    setCalculationBoxPosition([top, width]);
    setMeasureType(type);
  }

  function resetClick() {
    if (measureType === 'distance') {
      setDistanceValue([]);
      setDistanceSource(null);
      setDistanceLayer(null);
    }
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
      {measureSum !== 0 && measureType !== 'none' && (
        <CalculationBox className='body' $position={calculationBoxPosition}>
          <p>
            {measureSum.toFixed(3)} {measureUnit}
          </p>
          <Button size='xs' color='secondary' onClick={resetClick}>
            초기화
          </Button>
        </CalculationBox>
      )}
    </>
  );
};
