import styled from 'wrapper-styled-components';
import { keyframes } from 'styled-components';
// Animação de rolar para baixo
const dropdownOpen = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0.7) translateY(-12px);
  }
  100% {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
`;
import { ColorContainer } from '../global/colorContainer/colorContainer';

export const DropdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background: transparent !important;
  pointer-events: auto;
  backdrop-filter: none !important;
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled(ColorContainer).attrs({ as: "button" })`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  outline: none;
`;

export const DropdownList = styled(ColorContainer).attrs({ as: "ul" })`
  ${styled.themeLayer};

  position: absolute;
  top: 100%;
  left: 0;
  right: auto;
  width: max-content;
  min-width: clamp(140px, 25vw, 220px);
  max-width: 90vw;
  max-height: 60vh;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  backdrop-filter: ${({ theme }) => theme.blur};
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 8px 0 0 0;
  padding: 8px 0;
  list-style: none;
  z-index: 9999;
  pointer-events: auto;
  transform: translateX(0);
  animation: ${dropdownOpen} 0.22s cubic-bezier(.4,0,.2,1);

  /* Se ultrapassar a tela, alinhe à direita */
  &[data-align="right"] {
    left: auto;
    right: 0;
  }

  /* Fallback para telas pequenas */
  @media (max-width: 768px) {
    right: 0;
    left: auto;
    max-width: calc(100vw - 32px);
    min-width: 200px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    max-width: calc(100vw - 16px);
    min-width: 180px;
  }

`;

export const DropdownItem = styled.li`
  padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 18px);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: clamp(0.875rem, 2vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary + '22'};
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;
