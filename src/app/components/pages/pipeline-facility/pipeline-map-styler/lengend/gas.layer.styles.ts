import styled from 'styled-components';

export interface StyledProps {
  $borderTopStyle?: string;
  $height?: string;
  $color?: string;
}

export const LegendRows = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    min-width: 10rem;
    padding: 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const TestboxNGovernorLegendSymbol = styled.span<StyledProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  background-color: ${(props) => props.$color};
  margin: 0 0.5rem 0 0;
  border-radius: 50%;
  border: 2px solid #292929;
`;
