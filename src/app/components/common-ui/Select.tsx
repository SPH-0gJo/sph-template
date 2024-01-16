import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SelectLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
`;

const SelectBox = styled.div`
  flex: 0 0 50%;
  border: 0;
  height: 2rem;
  min-width: 50%;
  border-radius: 0.3rem;
  padding: 0.32rem 1rem 0.32rem 0.5rem;
  background: var(--light-surface-level-2);
  position: relative;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
    
  &:focus-visible {
      outline: 1px solid var(--light-secondary-a64);
  }
    
  &::before {
      content: "⌵";
      position: absolute;
      top: 1px;
      right: 8px;
      color: var(--light-secondary-dark);
      font-size: 1.2rem;
  }
`;

const SelectBoxLabel = styled.label`
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
    box-sizing: border-box;
    position: absolute;
    list-style-type: none;
    top: 2.1rem;
    left: 0;
    width: auto;
    min-width: 100%;
    border-radius: 6px;
    background: var(--white);
    box-shadow: 2px 2px 6px rgba(0,0,0,0.25);
    height: ${(props) => (props.show ? 'auto' : '0')};
    max-height: ${(props) => (props.show ? '200px' : '0')};
    transition: height 0.2s ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background: #eee;
    }
    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
`;

const Option = styled.li`
    box-sizing: border-box;
    padding: 0.55rem;
    transition: 0.3s;
    cursor: pointer;
    
    &:hover {
        background: #ebebeb;
    }
    
    &.selected {
        background: var(--light-secondary-origin);
        color: #fff;
    }
`;

interface OptionData {
  key: string;
  value: string;
}

interface SelectProps {
  label?: string;
  optionData: OptionData[];
}

export const Select: React.FC<SelectProps> = ({ label, optionData }) => {
  const [currentValue, setCurrentValue] = useState(optionData[0].value);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setShowOptions(false);
  }, [currentValue]);
  const handleSelectChange = (value: string) => {
    setCurrentValue(value);
    setShowOptions(false);
    setSelectedOption(value);
  };

  return (
    <SelectWrapper>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
        <SelectBoxLabel>{currentValue}</SelectBoxLabel>
        <SelectOptions show={showOptions}>
          {optionData.map((data) => (
            <Option
              key={data.key}
              value={data.value}
              className={selectedOption === data.value ? 'selected' : ''}
              onClick={() => handleSelectChange(data.value)}
            >
              {data.value}
            </Option>
          ))}
        </SelectOptions>
      </SelectBox>
    </SelectWrapper>
  );
};


