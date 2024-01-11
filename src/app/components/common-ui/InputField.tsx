import React from 'react';
import styled from 'styled-components';

const InputFieldWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const InputFieldLabel = styled.label`
  color: #000;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0075rem;
`;

const InputFieldBase = styled.div`
  flex: 0 0 50%;
  border: 0;
  width: 6.8125rem;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--light-surface-level-2);
`;

const Field = styled.input.attrs((props) => ({
  type: `${props.type}`,
}))`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0rem 0.875rem;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

interface UIStyleOptions {
  label?: string;
  inputType?: string;
  value?: string | number;
  setInputValue: (value: string | number) => void;
}

export const InputField = (props: UIStyleOptions) => {
  return (
    <InputFieldWrapper>
      {!props.label || <InputFieldLabel>{props.label}</InputFieldLabel>}
      <InputFieldBase>
        <Field
          type={props.inputType || 'text'}
          value={props.value}
          onChange={(e) => {
            props.setInputValue(e.target.value);
          }}
        />
      </InputFieldBase>
    </InputFieldWrapper>
  );
};
