import styled from 'wrapper-styled-components';
import { ColorContainer } from '../colorContainer/colorContainer';
import type { ViewMaskProps } from './viewContainer';

interface ViewContainerProps {
  $masksrc?: ViewMaskProps;
}

export const ViewContainer = styled(ColorContainer).attrs({ as: "div" })<ViewContainerProps>`
  ${styled.themeLayer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => `calc(100vh - ${theme.header.isOnScroll.height})`};
  padding: 2rem clamp(1rem, 4vw, 2rem) 2rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  ${({ $masksrc }) => $masksrc && `
    position: relative;
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${$masksrc.backgroundImage || $masksrc.src});
      background-attachment: ${$masksrc.backgroundAttachment || 'fixed'};
      background-size: ${$masksrc.backgroundSize || 'cover'};
      background-position: ${$masksrc.backgroundPosition || $masksrc.position || 'center'};
      background-repeat: ${$masksrc.backgroundRepeat || 'no-repeat'};
      opacity: ${$masksrc.opacity || 1};
      z-index: 0;
      pointer-events: none;
    }
    > * {
      position: relative;
      z-index: 1;
    }
  `}
  
  @media (max-width: 768px) {
    padding: 76px 1rem 2rem;
    min-height: calc(100vh - 56px);
  }

  @media (max-width: 480px) {
    padding: 72px 1rem 1rem;
  }
`;

export const VideoBackground = styled.video<{width?: string, height?: string}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  filter: blur(8px);
  border-radius: 20px;
`;