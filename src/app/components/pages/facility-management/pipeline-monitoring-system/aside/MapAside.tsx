import React from 'react';
import { LayerList } from 'app/components/pages/facility-management/pipeline-monitoring-system/aside/LayerList';
import {
  MonitoringMenu,
} from 'app/components/pages/facility-management/pipeline-monitoring-system/aside/MonitoringMenu';
import styled from 'styled-components';

const Aside = styled.aside`
    grid-area: aside;
    width: 100%;
    height: 100%;
    display: flex;
    user-select: none;
`;

const MenuListWrapper = styled.div`
    width: 10%;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    background: var(--dark-surface-level-2);
    padding: 2rem 2.5rem;
`;

const LayerListWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--light-surface-level-2);
    padding: 2rem 1.5rem;
`;

export const MapAside = () => {
  return (
    <Aside>
      <MenuListWrapper>
        <MonitoringMenu />
      </MenuListWrapper>
      <LayerListWrapper>
        <LayerList />
      </LayerListWrapper>
    </Aside>
  );
};
