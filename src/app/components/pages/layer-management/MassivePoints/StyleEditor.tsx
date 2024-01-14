import React from 'react';
import { numberFormatterForUS } from 'shared/modules/app.utils';
import styled from 'styled-components';

const StyleEditorWrapper = styled.div`
  background-color: var(--white);
  border-radius: 1rem;
  position: fixed;
  top: 7.625rem;
  left: 2rem;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const PointCountButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PointCountButton = styled.button`
  border: 0;
  border-radius: 0.5rem;
  background-color: var(--light-surface-level-2);
  width: 5rem;
  height: 2.5rem;
  color: var(--dark-text-hint);
  font-weight: 700;
  &:hover {
    background-color: var(--light-surface-level-4);
    color: var(--dark-text-hint);
    font-size: 1.2rem;
  }
  &.selected {
    background-color: var(--dark-surface-level-1);
    color: var(--white);
  }
`;

interface StyleEditorData {
  pointCount: number;
}

interface StyleEditorProps {
  data: StyleEditorData;
  changePointCount: (count: number) => void;
}

export const StyleEditor = (props: StyleEditorProps) => {
  const pointCounts = [100, 1000, 10000, 100000];
  const { pointCount } = props.data;
  return (
    <StyleEditorWrapper>
      <PointCountButtons>
        {pointCounts.map((count) => (
          <PointCountButton
            className={`${pointCount === count ? 'selected' : ''} subtitle`}
            key={count}
            onClick={() => {
              props.changePointCount(count);
            }}
          >
            {numberFormatterForUS(count * 1000)}
          </PointCountButton>
        ))}
      </PointCountButtons>
    </StyleEditorWrapper>
  );
};
