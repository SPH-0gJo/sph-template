import React from 'react';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.div`
  color: var(--light-text-secondary);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: auto;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  em {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
`;

export const Breadcrumb = () => {
  const samples = ['Main', '시설물 관리', '배관시설물 관리'];
  return (
    <BreadcrumbWrapper className={'body'}>
      {samples.map((name, index) => {
        return (
          <span key={index}>
            <a>{name}</a>
            {index !== samples.length - 1 && <em className={'icon-chevron-right'} />}
          </span>
        );
      })}
    </BreadcrumbWrapper>
  );
};
