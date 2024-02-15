import React, { useEffect } from 'react';
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

  useEffect(() => {
    setCoverage(1);
    setRadius(1000);
    setUpper(100);
  }, []);

  return (
    <>
      <ControllerWrapper>
        <TypeLabel>Coverage</TypeLabel>
        <RangeSlider
          range={coverage}
          step={0.1}
          min={0}
          max={1}
          onChange={(e) => setCoverage(Number(e.target.value))}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>Radius</TypeLabel>
        <RangeSlider
          range={radius}
          step={100}
          min={500}
          max={20000}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>Upper Percentile</TypeLabel>
        <RangeSlider range={upper} step={0.1} min={80} max={100} onChange={(e) => setUpper(Number(e.target.value))} />
      </ControllerWrapper>
    </>
  );
};
