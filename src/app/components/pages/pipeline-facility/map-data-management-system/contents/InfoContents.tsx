import React from 'react';
import styled from 'styled-components';

const LayerBoxContents = styled.div`
  user-select: none;
  overflow-y: auto;
  overflow-x: hidden;
  height: 30rem;
  display: flex;
  padding: 0rem 0.9375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;

  p {
    text-align: center;
  }
`;

export const InfoContent = () => {
  return (
    <LayerBoxContents>
      <p>영역을 그려주세요.</p>
    </LayerBoxContents>
  );
};
