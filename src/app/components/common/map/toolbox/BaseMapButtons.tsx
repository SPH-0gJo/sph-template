import React, { useEffect, useState } from 'react';
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
const SelectMapDiv = styled.div`
  display: flex;
  width: 2.125rem;
  height: 2rem;
  padding: 0.125rem;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  color: var(--white);
  background: #000;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
`;

export const BaseMapButtons = () => {
  const { style, setStyleOption } = useMapOptionsStore();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(vectorTileBaseMaps[0].title);

  useEffect(() => {
    vectorTileBaseMaps.forEach((vector) => {
      if (vector.style === style) setTitle(vector.title);
    });
    setVisible(false);
  }, [style]);

  return (
    <BaseMapButtonWrapper>
      {visible &&
        vectorTileBaseMaps.map(({ name, style: styleUrl }, index) => {
          const selected = style === styleUrl ? 'selected' : '';
          return (
            <BaseMapButton className={`${selected} caption_sm`} key={index} onClick={() => setStyleOption(styleUrl)}>
              {name}
            </BaseMapButton>
          );
        })}
      <SelectMapDiv
        className='caption_sm'
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {title}
      </SelectMapDiv>
    </BaseMapButtonWrapper>
  );
};
