import styled from 'wrapper-styled-components';
import { ColorContainer } from '../global/colorContainer/colorContainer';
import { mediaQueries } from '../../styles/breakpoints';

export const HeaderContainer = styled(ColorContainer).attrs({ as: "header" })<{$isAtTop?: boolean}>`
  ${styled.themeLayer};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: ${({ $isAtTop, theme }) => $isAtTop ? theme.header.top : theme.header.normal};
  display: grid;
  grid-template-columns: 60px minmax(200px, 1fr) minmax(120px, 220px);
  align-items: center;
  padding: 0 clamp(12px, 3vw, 24px);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  gap: clamp(8px, 2vw, 16px);
  box-sizing: border-box;
  backdrop-filter: ${({ theme }) => theme.blur};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  transition: height 0.3s cubic-bezier(0.4,0,0.2,1);

  ${mediaQueries.mobile} {
    height: ${({ $isAtTop }) => $isAtTop ? '72px' : '56px'};
    grid-template-columns: 48px 1fr auto;
    gap: 12px;
    padding: 0 16px;
  }

  ${mediaQueries.headerCollapse} {
    grid-template-columns: 52px 1fr auto;
  }
`;

export const Avatar = styled.img`
  width: clamp(32px, 5vw, 40px);
  height: clamp(32px, 5vw, 40px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  ${mediaQueries.mobile} {
    width: 32px;
    height: 32px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: clamp(12px, 3vw, 24px);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  ${mediaQueries.navCollapse} {
    display: none;
  }
`;

export const NavButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.textSecondary};
  border: none;
  border-radius: 6px;
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 18px);
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  min-width: clamp(70px, 15vw, 90px);
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.primary + '22'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${mediaQueries.headerCollapse} {
    min-width: 60px;
    padding: 6px 12px;
    font-size: 0.875rem;
  }
`;

export const Switches = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);
  min-width: clamp(80px, 20vw, 120px);
  justify-content: flex-end;
  flex-shrink: 0;

  ${mediaQueries.mobile} {
    min-width: auto;
    gap: 8px;
  }
`;

export const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: none;
  
  ${mediaQueries.navCollapse} {
    display: block;
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background};
    backdrop-filter: ${({ theme }) => theme.blur};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 16px;
    transform: translateY(${({ isOpen }) => isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: 99;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

export const MobileNavButton = styled.button<{ active: boolean }>`
  display: block;
  width: 100%;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.textSecondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 12px 16px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  text-align: left;
  margin-bottom: 8px;
  min-height: 48px;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.primary + '22'};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MenuToggle = styled.button`
  display: none;
  
  ${mediaQueries.navCollapse} {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    min-width: 44px;
    min-height: 44px;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primary + '22'};
    }
  }
`;
