import React, { useEffect } from 'react';
import { RangeSlider } from 'app/components/common-ui/RangeSlider';
import { useContourStore } from 'app/stores/visualization/contour.layer';
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
  const { cellSize, setCellSize, week, setWeek } = useContourStore();

  useEffect(() => {
    setCellSize(60000);
    setWeek(30);
  }, []);

  const updateRange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = Number(e.target.value);

    const typeFunc: { [key: string]: React.Dispatch<number> } = {
      cell: setCellSize,
      week: setWeek,
    };

    typeFunc[type](value);
  };

  return (
    <>
      <ControllerWrapper>
        <TypeLabel>Cell Size</TypeLabel>
        <RangeSlider
          range={cellSize}
          step={5000}
          min={30000}
          max={100000}
          onChange={(e) => setCellSize(Number(e.target.value))}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <TypeLabel>Week</TypeLabel>
        <RangeSlider range={week} max={86} onChange={(e) => setWeek(Number(e.target.value))} />
      </ControllerWrapper>
    </>
  );
};
