import React from 'react';
import { useBreadcrumbStore } from 'app/stores/breadcrumb';
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
  const { breadcrumb } = useBreadcrumbStore();
  return (
    <BreadcrumbWrapper className={'body'}>
      {breadcrumb &&
        breadcrumb.map((name, index) => {
          return (
            <span key={index}>
              <a>{name}</a>
              {index !== breadcrumb.length - 1 && <em className={'icon-chevron-right'} />}
            </span>
          );
        })}
    </BreadcrumbWrapper>
  );
};
