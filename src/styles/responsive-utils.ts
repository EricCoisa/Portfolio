import { css } from 'styled-components';
import { mediaQueries } from './breakpoints';

// Utilitário para criar texto responsivo
export function responsiveText(mobileSize: string, desktopSize: string) {
  return css`
    font-size: clamp(${mobileSize}, 4vw, ${desktopSize});
  `;
}

// Utilitário para espaçamento responsivo
export function responsiveSpacing(mobilePadding: string, desktopPadding: string) {
  return css`
    padding: clamp(${mobilePadding}, 4vw, ${desktopPadding});
  `;
}

// Utilitário para gaps responsivos
export function responsiveGap(mobileGap: string, desktopGap: string) {
  return css`
    gap: clamp(${mobileGap}, 3vw, ${desktopGap});
  `;
}

// Mixin para container responsivo
export const responsiveContainer = css`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
`;

// Mixin para flexbox responsivo
export function responsiveFlex(
  mobileDirection: 'row' | 'column' = 'column',
  desktopDirection: 'row' | 'column' = 'row'
) {
  return css`
    display: flex;
    flex-direction: ${mobileDirection};
    ${mediaQueries.tablet} {
      flex-direction: ${desktopDirection};
    }
  `;
}

// Mixin para grid responsivo
export function responsiveGrid(
  mobileColumns: string = '1fr',
  tabletColumns: string = 'repeat(2, 1fr)',
  desktopColumns: string = 'repeat(3, 1fr)'
) {
  return css`
    display: grid;
    grid-template-columns: ${mobileColumns};
    gap: clamp(1rem, 3vw, 2rem);
    ${mediaQueries.tablet} {
      grid-template-columns: ${tabletColumns};
    }
    ${mediaQueries.desktop} {
      grid-template-columns: ${desktopColumns};
    }
  `;
}

// Utilitário para botões touch-friendly
export const touchFriendly = css`
  min-height: 44px;
  min-width: 44px;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
`;

// Utilitário para animações responsivas
export const responsiveAnimation = css`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${mediaQueries.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

// Mixin para cards responsivos
export const responsiveCard = css`
  ${responsiveContainer}
  ${responsiveSpacing('1rem', '1.5rem')}
  border-radius: clamp(8px, 2vw, 12px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  ${mediaQueries.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

// Utilitário para texto truncado responsivo
export function responsiveTruncate(lines: number = 1) {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    ${mediaQueries.mobile} {
      -webkit-line-clamp: ${Math.max(1, lines - 1)};
    }
  `;
}

// Utilitário para scroll horizontal touch-friendly
export const horizontalScroll = css`
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Scroll suave em dispositivos touch */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

// Utilitário para focus states acessíveis
export const accessibleFocus = css`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
