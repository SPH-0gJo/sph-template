import React, { useState } from 'react';
import { useLoadingStore } from 'app/stores/loading';
import styled from 'styled-components';

interface SpinnerWrapperProps {
  $loading: boolean;
}

const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  position: fixed;
  z-index: 1000;
  display: ${(props) => (props.$loading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: var(--black-a32);
  width: 100%;
  height: 100vh;
`;

const Loader = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid var(--dark-surface-level-2);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => {
  const { loading } = useLoadingStore();

  return (
    <SpinnerWrapper className='pos-center' $loading={loading}>
      <Loader></Loader>;
    </SpinnerWrapper>
  );
};
