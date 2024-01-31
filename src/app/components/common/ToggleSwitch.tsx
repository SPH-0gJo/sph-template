import React from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 1rem;
`

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--black-a16);
  -webkit-transition: .4s;
  transition: .4s;
  &:before{
    position: absolute;
    content: "";
    height: 0.725rem;
    width: 0.725rem;
    left: 0.125rem;
    bottom: 0.125rem;
    background-color: var(--white-a100);
    -webkit-transition: .4s;
    transition: .4s;
  }
  ${CheckBox}:checked + & {
      background-color: var(--dark-surface-level-2);
      &:before {
          transform: translateX(1rem);
      }
  }
  ${CheckBox}:focus  {
      box-shadow: 0 0 1px var(--dark-surface-level-2);
  }
`

const RoundSlider = styled(Slider)`
    border-radius: 34px;
    &:before{
        border-radius: 50%;
    }
`

interface defaultProps{
  type:string;
  value:(checked:boolean)=>void;
}

export const ToggleSwitch = (props:defaultProps) => {
  const {type, value} = props;

  return(
    <Switch htmlFor="toggleSwitch">
      <CheckBox
        type='checkbox'
        id="toggleSwitch"
        onClick={(e:React.MouseEvent<HTMLInputElement>)=>{
          const { checked } = e.target as HTMLInputElement;
          value(checked)
        }}/>
      {
        type==='round'?<RoundSlider/>:<Slider/>
      }
    </Switch>
  )
}