import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const ToggleButtonStyle = styled.div`
  display: inline-flex;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background-color: var(--light-surface-level-1);
  button {
    flex: 1;
    font-size: 0.8rem;
    color: #718096;
    border: 1px var(--palette-green-500) solid;
    border-left-width: 0;
    background-color: white;
    &.selected {
      background-color: rgba(0, 89, 223, 0.08);
      color: #0059df;
    }
    :disabled {
      background-color: rgba(0, 0, 0, 0.08);
      color: #718096;
    }
  }
  button:first-child {
    border-left-width: 1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

interface ButtonItem {
  value: string | number;
  label: string;
}

interface UIStyleOptions {
  disabled?: boolean;
  style?: React.CSSProperties;
}
interface ToggleButtonProps extends UIStyleOptions {
  defaultValue?: string | number;
  items: ButtonItem[];
  onBtnChanged?: (selectedValue: string | number) => void;
}
export const ToggleButton = (props: ToggleButtonProps) => {
  const [selected, setSelected] = useState<string | number>();
  const { defaultValue } = props;

  useEffect(() => {
    if (!props.onBtnChanged || selected === undefined) return;
    props.onBtnChanged(selected);
  }, [selected]);

  useEffect(() => {
    if (defaultValue === undefined) return;
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <ToggleButtonStyle style={{ ...props.style }}>
      {!props.items ||
        props.items.map(({ value, label }) => {
          return (
            <button
              key={value}
              disabled={props.disabled}
              className={value === selected ? 'selected' : ''}
              onClick={() => setSelected(value)}
            >
              {label}
            </button>
          );
        })}
    </ToggleButtonStyle>
  );
};
