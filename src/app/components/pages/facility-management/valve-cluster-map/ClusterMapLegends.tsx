import React, { useEffect, useState } from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import styled from 'styled-components';

const ClusterMapLegendBox = styled.div`
  border: 1px solid var(--dark-text-secondary);
  position: fixed;
  right: 1rem;
  top: 7rem;
  background-color: var(--white);
  border-radius: 1rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClusterLegendItems = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

interface StyledProps {
  $bgColor: string;
}

const ColorCircle = styled.span<StyledProps>`
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor};
  height: 1.2rem;
  width: 1.2rem;
  display: inline-block;
`;

export const clusterCircleRange = [
  ['#51bbd6', '100'],
  ['#11C031', '750'],
  ['#EE3F3F', '750'],
];

export const valveTypeLegends = [
  ['#fc03e3', '고압 밸브'],
  ['#ff000d', '중압 밸브'],
  ['#0037ff', '고압 밸브'],
];

export const ClusterMapLegends = () => {
  const { zoomLevel: zoom } = useMapOptionsStore();
  const [legendItems, setLegendItems] = useState(clusterCircleRange);
  const [isClustered, setIsClustered] = useState(true);
  useEffect(() => {
    setIsClustered(zoom < 15);
    if (isClustered) setLegendItems([...clusterCircleRange]);
    else setLegendItems([...valveTypeLegends]);
  }, [zoom]);

  return (
    <ClusterMapLegendBox>
      <ul>
        {!legendItems.length ||
          legendItems.map((e, index) => {
            const [color, legendLabel] = e;
            const legendLabelElement = isClustered ? <>&#8924;&#09;&#09;&#09;{legendLabel}</> : <>{legendLabel}</>;
            return (
              <ClusterLegendItems key={`cluster_legend_item${index}`}>
                <ColorCircle $bgColor={color} />
                {legendLabelElement}
              </ClusterLegendItems>
            );
          })}
      </ul>
    </ClusterMapLegendBox>
  );
};
