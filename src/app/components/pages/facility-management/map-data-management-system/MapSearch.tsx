import React from 'react';
import { Select } from 'app/components/common-ui';
import styled from 'styled-components';

const MapSearchWrapper = styled.div`
    height: 2rem;
    display: flex;
    position: fixed;
    left: 1rem;
    right: 1rem;
    top: 6.525rem;
    justify-content: center;
    align-items: center;
    user-select: none;

    div {
        display: flow-root;
        width: 8rem;
        margin-right: 2rem;

        div {
            width: 100%;
            border: 1px solid var(--black-a32);
        }
    }
`;

const options = [
  { key: 'test_1', label: 'test_1', value: 'test_1' },
  { key: 'test_2', label: 'test_2', value: 'test_2' },
  { key: 'test_3', label: 'test_3', value: 'test_3' },
];

export const MapSearch = () => {
  return (
    <MapSearchWrapper>
      <Select optionData={options} defaultKey={'test_1'}></Select>
      <Select optionData={options} defaultKey={'test_1'}></Select>
      <Select optionData={options} defaultKey={'test_1'}></Select>
    </MapSearchWrapper>
  );
};
