import React, { useState } from 'react';
import { ToggleSwitch } from 'app/components/common-ui/ToggleSwitch';
import { useMobileMapStore } from 'app/stores/mobile/mobileMap';
import styled from 'styled-components';

const LayerBoxWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  flex-direction: column;
  border-radius: 0.625rem;
  background: var(--dark-surface-level-2);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 4rem;
  right: 0.25rem;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const LayerBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  em{
    font-size: 1.5rem;
    color:var(--white);
  }
`;

const LayerBoxContents = styled.aside`
  //height: 100px;
  top: 6.5rem;
  right: 0.25rem;
  width: 2rem;
  background-color: var(--white-a100);
  transition: .3s ease-out;
  position: fixed;
  border-radius: 0.625rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const LayerIconIdle = styled.em`
    font-size: 2rem;
    background-color: var(--white-a100);
    border-radius: 0.625rem;
    &:hover{
        background-color: var(--black-a12);
    }
`
const LayerIconClick = styled.em`
    font-size: 2rem;
    background-color: var(--dark-surface-level-2);
    color: var(--white-a100);
    border-radius: 0.625rem;
    &:hover{
        background-color: var(--black-a12);
    }
`

const Tooltip = styled.div`
  display: none;
  border: 1px solid blue;
  border-radius: 6px;
  padding: 8px 11px;
  font-size: 16px;
  line-height: 22px;
`;

export const LayerBox = ()=>{
  const [open, setOpen] = useState<boolean>(false);
  const { setMapLayerViewList,mapLayerViewList } = useMobileMapStore();
  const layerList = ['gas-pipe', 'gas-valve', 'gas-tb', 'gas-gauge']

  const opacityValue = open ? '' : '0';
  const visibilityValue = open ? 'visible' : 'hidden';

  const getValue = (id:string) => {
    const newSet = mapLayerViewList;

    if(mapLayerViewList.has(id)){
      newSet.delete(id)
    }else{
      newSet.add(id)
    }

    setMapLayerViewList(newSet)
  }

  return(
    <LayerBoxWrapper>
      <LayerBoxHeader>
        <em onClick={()=>setOpen(!open)} className='icon-layers-o' />
      </LayerBoxHeader>
      <LayerBoxContents style={{opacity:opacityValue, visibility:visibilityValue}}>
        {layerList.map((nm, idx)=>{
          if(mapLayerViewList.has(nm)){
            return (
              <div key={idx}>
                <LayerIconClick className={`icon-${nm}`} onClick={()=>getValue(nm)}/>
              </div>
            )
          } else {
            return (
              <div key={idx}>
                <LayerIconIdle className={`icon-${nm}`} onClick={()=>getValue(nm)}/>
              </div>
            )
          }
        })}
      </LayerBoxContents>
    </LayerBoxWrapper>
  )
}