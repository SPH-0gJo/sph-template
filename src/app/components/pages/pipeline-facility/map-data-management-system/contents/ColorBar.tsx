import React from 'react';
import styled from 'styled-components';

const CustomColorBar = styled.div<ColorBarProps>`
  position: absolute; /* 절대 위치 설정 */
  width: 1rem;
  height: 100%;
  top: 0;
  left: 0;
  border-bottom: 1px solid var(--light-secondary-a16, rgba(0, 68, 120, 0.16));
  background: ${(props) => props.color};
`;

interface ColorBarProps {
  color: string;
}

export const ColorBar = (props: ColorBarProps) => {
  return <CustomColorBar color={props.color} />;
};
