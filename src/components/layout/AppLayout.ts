import styled from 'wrapper-styled-components';

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const MainContent = styled.main<{ $scrolled?: boolean; paddingTop?: number }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: ${({ $scrolled, paddingTop }) => $scrolled ? '0px' : `${paddingTop ?? 120}px`};
  padding-bottom: ${({ $scrolled }) => $scrolled ? '0px' : '30px'};
  gap: 24px;
`;
