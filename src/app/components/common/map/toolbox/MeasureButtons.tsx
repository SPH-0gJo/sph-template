import React, { useEffect, useState } from 'react';
import { Button } from 'app/components/common-ui';
import { useMapOptionsStore } from 'app/stores/mapOptions';
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
  const [measureUnit, setMeasureUnit] = useState('');
  const { measureType, measureValue, setMeasureType, setMeasureSource, setMeasureLayer, setMeasureValue } =
    useMapOptionsStore();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - (window.innerWidth - 55));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      setMeasureValue(0);
      setMeasureType('none');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (measureType === 'none' || !calculationBoxPosition) return;
    setCalculationBoxPosition([calculationBoxPosition[0], width]);
  }, [width]);

  useEffect(() => {
    const unitFunc: { [key: string]: string } = {
      none: '',
      radius: '',
      distance: 'km',
      area: '',
    };
    setMeasureUnit(unitFunc[measureType]);
  }, [measureType]);

  function getCalculationBoxPosition(e: React.MouseEvent, type: measureTypes) {
    if (!e.currentTarget || type === 'none') return;
    const { top } = e.currentTarget.getBoundingClientRect();
    setCalculationBoxPosition([top, width]);
    setMeasureType(type);
  }

  function resetClick() {
    if (measureType === 'distance') {
      setMeasureValue(0);
      setMeasureSource(null);
      setMeasureLayer(null);
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
      {measureValue !== 0 && measureType !== 'none' && (
        <CalculationBox className='body' $position={calculationBoxPosition}>
          <p>
            {measureValue.toFixed(3)} {measureUnit}
          </p>
          <Button size='xs' color='secondary' onClick={resetClick}>
            초기화
          </Button>
        </CalculationBox>
      )}
    </>
  );
};
