import React, { useEffect } from 'react';
import { RangeSlider } from 'app/components/common-ui/RangeSlider';
import { useScreenGridStore } from 'app/stores/visualization/screenGrid.layer';
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
  const { cellSize, setCellSize, gpuAggregation, setGpuAggregation } = useScreenGridStore();

  useEffect(() => {
    setCellSize(16);
    setGpuAggregation(true);
  }, []);

  return (
    <>
      <ControllerWrapper>
        <TypeLabel>Cell Size</TypeLabel>
        <RangeSlider
          range={cellSize}
          step={1}
          min={1}
          max={20}
          onChange={(e) => {
            setCellSize(Number(e.target.value));
          }}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>GPU Acceleration</TypeLabel>
        <input
          checked={gpuAggregation}
          type='checkbox'
          onChange={(e) => {
            setGpuAggregation(e.target.checked);
          }}
        />
      </ControllerWrapper>
    </>
  );
};
