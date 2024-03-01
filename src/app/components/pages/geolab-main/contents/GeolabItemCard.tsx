import React from 'react';
import { Link } from 'react-router-dom';
import { GeolabMenuItems } from 'shared/constants/types/types';
import { NoImage } from 'shared/constants/varibales';
import styled from 'styled-components';

interface StyledProps {
  $thumbnail: string | undefined;
}

const ItemCard = styled.div`
  cursor: pointer;
  width: 30.375rem;
  height: 19.5rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow:
    0px 0px 4px 0px rgba(0, 0, 0, 0.04),
    0px 4px 12px 0px rgba(0, 0, 0, 0.04),
    0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  &:hover {
    border: 2px solid var(--light-primary-origin);
    h5 {
      color: var(--light-primary-origin);
    }
  }
`;

const CardImg = styled.img<StyledProps>`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 12.5rem;
  object-fit: ${(props) => (props.$thumbnail ? 'cover' : 'scale-down')};
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
  user-drag: none;
  -webkit-user-drag: none;
`;

const CardDescBox = styled.div`
  width: 100%;
  height: 7rem;
  padding: 0.98rem 1.28rem;
  h5 {
    color: var(--light-text-primary);
    margin-bottom: 0.86rem;
  }
  p {
    color: var(--light-text-secondary);
    text-shadow: 0px 1px 1px rgba(44, 44, 44, 0.02);
    font-size: 0.875rem;
    font-weight: var(--text-weight-normal);
    line-height: 1.3125rem;
    letter-spacing: 0.00625rem;
  }
`;

interface GeolabItemCardData {
  subMenu: GeolabMenuItems;
}

interface GeolabItemCardProps {
  data: GeolabItemCardData;
}

export const GeolabItemCard = (props: GeolabItemCardProps) => {
  const { subMenu } = props.data;
  const { name, summary, link, thumbnail } = subMenu;
  if (!link) return <></>;
  return (
    <Link to={link}>
      <ItemCard>
        <CardImg src={thumbnail || NoImage} alt='sample map inage' $thumbnail={thumbnail} />
        <CardDescBox>
          <h5>{name}</h5>
          <p>{summary}</p>
        </CardDescBox>
      </ItemCard>
    </Link>
  );
};
