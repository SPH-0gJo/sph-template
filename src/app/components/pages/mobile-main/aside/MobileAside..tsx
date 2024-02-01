import React, { useEffect, useState } from 'react';
import { ToggleSwitch } from 'app/components/common/ToggleSwitch';
import { useMobilePageStore } from 'app/stores/mobile/mobilePages';
import styled from 'styled-components';

const StyledAside = styled.aside`
  grid-area: aside;
  width: 80%;
  height: 100%;
  background-color: var(--white-a100);
  transition: transform 600ms ease;
  z-index: 1;
  position: relative;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  padding-top: 3.625rem ;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Button = styled.button`
  font-size: 0.8rem;
  width: 100%;
  border: none;
  background-color: transparent;
  height: 2.5rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`
const Em = styled.em`
  font-size: 1.5rem;
  padding-right: 1rem;
`

interface menuType{
  title : string;
  icon : string;
  toggle:boolean;
  key : number;
}

export const MobileAside = () => {
  const { menuOpen } = useMobilePageStore();
  const [ menuList, setMenuList ] = useState<Array<menuType>>([])

  useEffect(() => {
    const newMenuList = [
      {title:'지도 주소 검색', icon:'icon-magnifier', toggle:false, key:0},
      {title:'지도 중심 정보 표시', icon:'icon-map-position', toggle:true, key:1},
      {title:'레이어 범례', icon:'icon-layers-o', toggle:false, key:2},
      {title:'설정', icon:'icon-cog', toggle:false, key:3},
    ]

    setMenuList(newMenuList)
  }, []);

  const transformValue = menuOpen ? '' : 'translateX(-100%)';

  const getValue = (e:boolean) => {
    console.log(e);
  }
  return (
    <StyledAside style={{ transform: transformValue }}>
       {menuList.map(({title,icon,toggle,key})=> {
         return(
           <Button key={key}>
             <Em className={icon}></Em>
             <span style={{paddingRight:'8rem'}}>{title}</span>
             {!toggle||
                <ToggleSwitch type={'round'} value={getValue}/>
             }
           </Button>
         )
        })
       }
    </StyledAside>
  );
};