import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainMenu, SubMenu } from 'shared/constants/types';
import styled from 'styled-components';

interface StyledProps {
  $isActive?: boolean;
  disabled?: boolean;
}

const MenuTitle = styled.section<StyledProps>`
  color: ${(props) => (props.$isActive ? 'var(--light-primary-origin)' : 'var(--dark-text-secondary)')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  em {
    font-size: 1.25rem;
    transform: ${(props) => (props.$isActive ? 'rotate(-90deg)' : 'rotate(90deg)')};
  }
`;

const SubMenuItems = styled.ul<StyledProps>`
  color: var(--dark-text-primary);
  text-shadow: 0px 1px 1px rgba(44, 44, 44, 0.02);
  display: ${(props) => (props.$isActive ? 'flex' : 'none')};
  width: 17.5rem;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.625rem;
  background-color: var(--white-a4);
  li {
    cursor: pointer;
    &:hover {
      color: var(--palette-green-500);
    }
  }
`;

interface GeolabMenuData {
  menuItem: MainMenu;
}

interface GeolabMenuProps {
  data: GeolabMenuData;
}

export const GeolabMenu = (props: GeolabMenuProps) => {
  const [subMenuActivate, setSubMenuActivate] = useState(false);
  const [menuItems, setMenuItems] = useState<SubMenu[] | undefined>(undefined);
  const [hasMenus, setHasMenus] = useState(true);

  useEffect(() => {
    const { children } = menuItem;
    if (!children) return;
    setHasMenus(!children);
    setMenuItems(children);
  }, []);

  const { menuItem } = props.data;

  return (
    <li className={hasMenus ? 'geolab_el_disabled' : ''}>
      <MenuTitle $isActive={subMenuActivate} onClick={() => setSubMenuActivate(!subMenuActivate)}>
        <span>{menuItem.name}</span>
        <em className='icon-chevron-right-large' />
      </MenuTitle>
      <SubMenuItems $isActive={subMenuActivate}>
        {!menuItems ||
          menuItems.map((e, index) => (
            <li className='subtitle' key={index}>
              <Link to={e.link}>{e.name}</Link>
            </li>
          ))}
      </SubMenuItems>
    </li>
  );
};
