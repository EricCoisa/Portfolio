import styled from "wrapper-styled-components";

export const LineStyled = styled.hr<{ color?: string }>`
  border: none;
  border-bottom: 2px solid ${({ color, theme }) => color || theme.colors.detail};
  margin: 1rem 0;
  width: 100%;
  opacity: 0.7;
`;
