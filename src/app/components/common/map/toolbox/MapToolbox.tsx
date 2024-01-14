import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ToolboxButtonWrapper, ToolboxButton } from 'shared/styles/styled/common';
import { BaseMapButtons } from 'app/components/common/map/toolbox/BaseMapButtons';
import { MeasureButtons } from 'app/components/common/map/toolbox/MeasureButtons';
import { ZoomButtons } from 'app/components/common/map/toolbox/ZoomButtons';

const ToolboxContainer = styled.div`
  height: 50rem;
  position: fixed;
  right: 1rem;
  top: 6.525rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.625rem;
  user-select: none;
`;

interface StyledProps {
  $position: number[] | undefined;
}

const ToolboxTip = styled.div<StyledProps>`
  position: fixed;
  top: ${(props) => (props.$position ? `${props.$position[0]}px` : 0)};
  left: ${(props) => (props.$position ? `${props.$position[1]}px` : 0)};
  display: inline-flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.375rem;
  background-color: var(--light-secondary-dark);
  ::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    margin-top: -5px;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid var(--light-secondary-dark);
  }
  span {
    color: var(--white, #fff);
    font-size: 0.75rem;
    font-weight: var(--text-weight-semibold);
  }
`;

export const MapToolbox = () => {
  const toolboxContainer = useRef<HTMLDivElement | null>(null);
  const [calculationBoxPosition, setCalculationBoxPosition] = useState<number[] | undefined>(undefined);
  const [toolboxButtonTitle, setToolboxButtonTitle] = useState('');

  useEffect(() => {
    const toolbox = toolboxContainer.current;
    if (!toolbox) return;
    const buttonDiv = toolbox.querySelectorAll('div');
    ToolboxButtonEvent(buttonDiv, true);
    return () => ToolboxButtonEvent(buttonDiv, false);
  }, []);

  function ToolboxButtonEvent(element: NodeListOf<HTMLDivElement>, action: boolean) {
    element.forEach((e, index) => {
      if (!index) return;
      const toolboxButtons = e.querySelectorAll('button');
      buttonEvent(toolboxButtons, action);
    });
  }

  const eventHandler = (e: CustomEvent<MouseEvent>): void => {
    if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLButtonElement;
    const { top, left: currentLeft, width } = target.getBoundingClientRect();
    const left = currentLeft - width * 1.8; // 0.5 is right margin
    setToolboxButtonTitle(target.title);
    setCalculationBoxPosition([top, left]);
  };
  const eventHandleRemove = () => setCalculationBoxPosition(undefined);

  function buttonEvent(elements: NodeListOf<HTMLButtonElement>, eventAction: boolean) {
    elements.forEach((button) => {
      if (eventAction) {
        button.addEventListener('mouseover', eventHandler as EventListener);
        button.addEventListener('mouseout', eventHandleRemove);
        return;
      }
      setToolboxButtonTitle('');
      button.removeEventListener('mouseover', eventHandler as EventListener);
      button.removeEventListener('mouseout', eventHandleRemove);
    });
  }

  return (
    <ToolboxContainer ref={toolboxContainer}>
      <BaseMapButtons />
      <ToolboxButtonWrapper>
        <ToolboxButton title='주제도'>
          <em className='icon-layers' />
        </ToolboxButton>
        <ToolboxButton title='거리뷰'>
          <em className='icon-map-street' />
        </ToolboxButton>
      </ToolboxButtonWrapper>
      <MeasureButtons />
      <ZoomButtons />
      {calculationBoxPosition?.length && (
        <ToolboxTip $position={calculationBoxPosition}>
          <span>{toolboxButtonTitle}</span>
        </ToolboxTip>
      )}
    </ToolboxContainer>
  );
};
