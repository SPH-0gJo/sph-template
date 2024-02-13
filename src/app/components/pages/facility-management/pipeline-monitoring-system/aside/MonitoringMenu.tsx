import React from 'react';
import { MonitoringMenuItems } from 'shared/fixtures/monitoring.menu.items';
import styled from 'styled-components';

export const MenuItem = styled.em`
    font-size: 2.1rem;
    color: var(--dark-text-primary);
    cursor: pointer;
`;
export const MonitoringMenu = () => {
  const MenuDivList = MonitoringMenuItems.map(item => {
    const { id, name, image } = item;

    return (
      <MenuItem key={`mn_menu_${id}`} className={`icon-${image}`} />
    );
  });

  return (
    <>
      {MenuDivList}
    </>
  );
};