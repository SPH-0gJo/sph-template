import React, { useState } from 'react';
import { GovernorLayerLegends } from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/GovernorLayerLegends';
import { PipelineLayerLegends } from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/PipelineLayerLegends';
import { TestboxLayerLegends } from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/TestboxLayerLegends';
import { ValveLayerLegends } from 'app/components/pages/pipeline-facility/pipeline-map-styler/lengend/ValveLayerLegends';
import styled from 'styled-components';

const GasLayerLegendWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  width: 30rem;
  background-color: var(--white);
  border-radius: 0.6rem;
  padding: 0.4rem 1rem;
`;

const LegendHeader = styled.header`
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid var(--light-text-disabled);
  display: flex;
  align-items: center;
  h6 {
    font-size: 0.9rem;
    font-weight: var(--text-weight-semibold);
  }
  em {
    margin-left: auto;
    margin-left: auto;
    font-size: 1.5rem;
    transform: rotate(-90deg);
    cursor: pointer;
  }
`;

const LegendContents = styled.section`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.8rem;
  overflow: auto;
`;

export const GasLayerLegend = () => {
  const [legendVisible, setLegendVisible] = useState(false);

  return (
    <GasLayerLegendWrapper>
      <LegendHeader>
        <h6>범례</h6>
        <em
          className={`icon-chevron-${legendVisible ? 'left' : 'right'}-large`}
          onClick={() => setLegendVisible(!legendVisible)}
        />
      </LegendHeader>
      <LegendContents>
        {legendVisible || <PipelineLayerLegends />}
        {legendVisible || <ValveLayerLegends />}
        {legendVisible || <TestboxLayerLegends />}
        {legendVisible || <GovernorLayerLegends />}
      </LegendContents>
    </GasLayerLegendWrapper>
  );
};
