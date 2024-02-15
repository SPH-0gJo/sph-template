import React from 'react';
import { RangeSlider } from 'app/components/common-ui/RangeSlider';
import { useHexagonStore } from 'app/stores/visualization/hexagon.layer';
import styled from 'styled-components';

const ControllerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TypeLabel = styled.span`
    width: 70%;
    font-size: 1rem;
    font-weight: var(--text-weight-normal);
    line-height: 1.625rem;
`;


export const DataController = () => {
  const { coverage, setCoverage, radius, setRadius, upper, setUpper } = useHexagonStore();

  const updateRange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = Number(e.target.value);

    const typeFunc: { [key: string]: React.Dispatch<number> } = {
      'coverage': setCoverage,
      'radius': setRadius,
      'upper': setUpper,
    };

    typeFunc[type](value);
  };

  return (
    <>
      <ControllerWrapper>
        <TypeLabel>Coverage</TypeLabel>
        <RangeSlider
          range={coverage} step={0.1} min={0} max={1}
          onChange={(e) => updateRange(e, 'coverage')}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>Radius</TypeLabel>
        <RangeSlider
          range={radius} step={100} min={500} max={20000}
          onChange={(e) => updateRange(e, 'radius')}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>Upper Percentile</TypeLabel>
        <RangeSlider
          range={upper} step={0.1} min={80} max={100}
          onChange={(e) => updateRange(e, 'upper')}
        />
      </ControllerWrapper>
    </>
  );
};
