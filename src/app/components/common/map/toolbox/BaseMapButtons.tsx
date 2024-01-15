import React from 'react';
import { useMapOptionsStore } from 'app/stores/mapOptions';
import { vectorTileBaseMaps } from 'shared/constants/baseMaps';
import styled from 'styled-components';

const BaseMapButtonWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const BaseMapButton = styled.button`
  width: 4rem;
  height: 2rem;
  border: 0.07rem solid #212121;
  border-radius: 0.3rem;
  &.selected {
    color: var(--light-secondary-dark);
    font-weight: var(--text-weight-bold);
    border: 0.15rem solid var(--light-secondary-dark);
  }
  &:hover {
    border: 0.15rem solid var(--light-primary-dark);
    color: var(--light-primary-dark);
  }
`;

export const BaseMapButtons = () => {
  const { style, setStyleOption } = useMapOptionsStore();

  return (
    <BaseMapButtonWrapper>
      {vectorTileBaseMaps.map(({ name, style: styleUrl }, index) => {
        const selected = style === styleUrl ? 'selected' : '';
        return (
          <BaseMapButton className={`${selected} caption_sm`} key={index} onClick={() => setStyleOption(styleUrl)}>
            {name}
          </BaseMapButton>
        );
      })}
    </BaseMapButtonWrapper>
  );
};
