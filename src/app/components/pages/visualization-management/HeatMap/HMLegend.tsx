import React from 'react';
import styled from 'styled-components';

const HeatMapLegendWrapper = styled.div`
    display: flex;
    width: 7.625rem;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    gap: 0.9375rem;
    border-radius: 0.625rem;
    background: var(--white);
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 1rem;
    left: 1.25rem;
    user-select: none;
    padding: 1.87rem 1rem;
`;

const ColorBoxWrapper = styled.div`
    display: flex;
    width: 5.25rem;
    height: 1rem;
    justify-content: space-between;
`;

const ColorTag = styled.span`
    color: black;
`;

const ColorBox = styled.div`
    width: 1rem;
    height: 1rem;
`;

const legendGroups: Array<string> = [
  'rgba(33,102,172,0)', 'rgba(103,169,207)', 'rgba(209,229,240)',
  'rgba(253,219,199)', 'rgb(239,138,98)', 'rgb(178,24,43)',
];

const ColorBoxList = () => {
  return legendGroups.map((rgb, rgbIdx) => {
    const border = rgbIdx === 0 ? 'black 1px solid' : 'none';
    return (
      <ColorBoxWrapper key={`legend_color_${rgbIdx}`}>
        <ColorTag>Level {rgbIdx + 1}</ColorTag>
        <ColorBox style={{ 'backgroundColor': rgb, 'border': border }} />
      </ColorBoxWrapper>
    );
  });
};

export const HMLegend = () => {
  return (
    <HeatMapLegendWrapper>
      <ColorBoxList />
    </HeatMapLegendWrapper>
  );
};