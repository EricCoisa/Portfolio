import styled from 'wrapper-styled-components';


export const ColorContainer = styled.div<{ as?: React.ElementType }>`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;