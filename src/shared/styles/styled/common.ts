import styled from 'styled-components';

export const Header = styled.header`
  background-color: var(--white-a100);
  height: 5.625rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.625rem 1.25rem;
  z-index: 999;
  em {
    font-size: 1.5rem;
    margin-right: 0.88rem;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 5.625rem 1fr;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-areas:
    'header'
    'content';
`;

export const ToolboxButton = styled.button`
  display: flex;
  width: 1.875rem;
  height: 1.75rem;
  padding: 0.25rem 0.8125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.375rem;
  border: 0;
  font-size: 1.5rem;
  color: var(--dark-text-disabled);
  background-color: var(--white-a100);
  &.selected {
    background-color: var(--light-secondary-light);
    color: var(--white);
  }
  &:hover {
    background-color: var(--light-secondary-a16);
  }
`;

export const ToolboxButtonWrapper = styled.div`
  display: flex;
  width: 2.125rem;
  padding: 0.125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
`;
