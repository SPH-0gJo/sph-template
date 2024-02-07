import React from 'react';
import { LayerList } from 'app/components/pages/facility-management/pipeline-monitoring-system/aside/LayerList';
import styled from 'styled-components';

interface ListWrapperProps {
  width: string;
}

const Aside = styled.aside`
  grid-area: aside;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0.625rem;
  user-select: none;
  background: var(--dark-surface-level-2);
  padding: 1rem 1.5rem;
`;

const ListWrapper = styled.div<ListWrapperProps>`
  width: ${props => props.width};
  display: flex;
  gap: 0.625rem;
  flex-direction: column;
  align-items: center;
`;

export const MapAside = () => {
  return (
    <Aside>
      <ListWrapper width="40%">
      </ListWrapper>
      <ListWrapper width="60%">
        <LayerList />
      </ListWrapper>
    </Aside>
  );
};
