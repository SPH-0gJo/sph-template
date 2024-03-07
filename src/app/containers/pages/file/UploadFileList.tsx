import React from 'react';
import styled from 'styled-components';

const UploadFileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: var(--white-a100);
  height: calc(90vh - 23rem);
  overflow: scroll;
`;

const InputWrapper = styled.div<{ color?: string }>`
  width: 95%;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    width: 100%;
    background-repeat: no-repeat;
    background-position: left center;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    font-family: 'Saira Semi Condensed', sans-serif;
    color: var(--white-a100);
    background-color: ${(props) => props.color};
    opacity: 0.1;
  }

  input:checked + label {
    background-color: ${(props) => props.color};
    opacity: 1;
  }

  input {
    display: none;
  }
`;

interface UploadFileListProps {
  layerList: string[];
  offLayer: (arg0: string, arg1: boolean) => void;
  checkMap: Map<string, string>;
  layerColor: Map<string, string>;
}

export const UploadFileList = (props: UploadFileListProps) => {
  const { layerList, offLayer, checkMap, layerColor } = props;
  return (
    <UploadFileListWrapper>
      {layerList?.map((layer, index) => (
        <InputWrapper key={index} color={layerColor.get(layer)}>
          <input
            type='checkbox'
            id={layer}
            defaultChecked={true}
            onChange={(e) => offLayer(layer, e.currentTarget.checked)}
          />
          <label htmlFor={layer}>
            {layer}&nbsp;
            <span>{checkMap?.get(layer) === 'visible' ? 'on' : 'off'}</span>
          </label>
        </InputWrapper>
      ))}
    </UploadFileListWrapper>
  );
};
