import React from 'react';
import styled from 'styled-components';

const RangeSliderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RangeSliderInput = styled.input`
    width: 82%;
    cursor: pointer;
`;

const RangeSliderTag = styled.span`
    font-size: 0.75rem;
    font-weight: var(--text-weight-normal);
    line-height: 1.25rem;
`;

export interface RangeSliderProps {
  range: number;
  step?: number;
  min?: number;
  max?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RangeSlider = (props: RangeSliderProps) => {
  const {
    range, step = 1,
    min = 0, max = 100,
    onChange,
  } = props;

  return (
    <RangeSliderWrapper>
      <RangeSliderInput
        type="range" value={range}
        min={min} max={max} step={step}
        onChange={onChange}
      />
      <RangeSliderTag>{range}</RangeSliderTag>
    </RangeSliderWrapper>
  );
};
