import styled from 'styled-components';

export const Header = styled.header`
  background-color: var(--light-surface-level-1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.63rem 1.25rem;
  em {
    font-size: 1.5rem;
    margin-right: 0.88rem;
  }
`;

export const ToolboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  button:first-child {
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
  }
  button:last-child {
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }
`;

export const ToolboxButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: var(--light-surface-level-0);
  border: 0.08rem solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  color: var(--light-text-secondary);
  padding: 0.4rem;
  em {
    font-size: 1.3rem;
  }
  &.selected {
    border: 0.15rem solid green;
    color: var(--light-text-primary);
    background-color: #c2c2c2;
    font-weight: var(--text-weight-bold);
  }
  &:hover {
    border: 0.15rem solid green;
    color: var(--light-text-primary);
  }
`;
