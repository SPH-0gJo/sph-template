import React, { useEffect, useState } from 'react';
import { ToggleSwitch } from 'app/components/common-ui/ToggleSwitch';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import { useMobilePageStore } from 'app/stores/mobile/mobilePages';
import styled from 'styled-components';

const StyledAside = styled.aside`
  grid-area: aside;
  width: 60%;
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
  font-size: 1rem;
  width: 100%;
  border: none;
  background-color: transparent;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 0.5rem;
  display: grid;
  align-items: center;
  margin-top: 0.5rem;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  text-align: left;
`
const Em = styled.em`
  font-size: 1.5rem;
  padding-right: 1rem;
`

interface menuType{
  id : string;
  title : string;
  icon : string;
  toggle:boolean;
  key : number;
}

export const MobileAside = () => {
  const { menuOpen, setMenuOpen } = useMobilePageStore();
  const { setMapInfoView, setMapLayerView, setMapSearch } = useMobileMapStore();
  const [ menuList, setMenuList ] = useState<Array<menuType>>([])

  useEffect(() => {
    const newMenuList = [
      {id:'search',title:'지도 주소 검색', icon:'icon-magnifier', toggle:false, key:0},
      {id:'info',title:'지도 정보 표시', icon:'icon-map-position', toggle:true, key:1},
      {id:'layer',title:'레이어 표출', icon:'icon-layers-o', toggle:true, key:2},
      {id:'setting',title:'설정', icon:'icon-cog', toggle:false, key:3},
    ]

    setMenuList(newMenuList)
  }, []);

  const transformValue = menuOpen ? '' : 'translateX(-100%)';

  const getValue = (value:boolean, id:string) => {
    switch (id){
      case 'info':
        setMapInfoView(value)
        break;
      case 'layer':
        setMapLayerView(value)
        break;
    }
  }
  const searchAction = () =>{
    setMapSearch(true);
    setMenuOpen(false);
  }

  return (
    <StyledAside style={{ transform: transformValue }}>
       {menuList.map(({id, title,icon,toggle,key})=> {
         return(
           <Button key={key} onClick={()=>{id==='search'?searchAction():''}}>
             <Em className={icon}></Em>
             <span>{title}</span>
             {!toggle||
                <ToggleSwitch id={id} type={'round'} value={(value)=>getValue(value,id)}/>
             }
           </Button>
         )
        })
       }
    </StyledAside>
  );
};