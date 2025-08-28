import styled from 'wrapper-styled-components';
import { ColorContainer } from '../colorContainer/colorContainer';

interface ViewContainerProps {
  $masksrc?: string;
}

export const ViewContainer = styled(ColorContainer).attrs({ as: "div" })<ViewContainerProps>`
  ${styled.themeLayer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => `calc(100vh - ${theme.header.normal})`};
  
  padding: 2rem clamp(1rem, 4vw, 2rem) 2rem;
  box-sizing: border-box;
  width: 100%;

  margin: 0 auto;
  border-radius: 20px;


  overflow: hidden;

  ${({ $masksrc }) => $masksrc && `
    background-image: url(${$masksrc});
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
  `}

  
  @media (max-width: 768px) {
    padding: 76px 1rem 2rem;
    min-height: calc(100vh - 56px);
  }

  @media (max-width: 480px) {
    padding: 72px 1rem 1rem;
  }
`;
