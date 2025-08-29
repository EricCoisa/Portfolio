import styled from 'wrapper-styled-components';
import { css } from 'styled-components';
import { motion } from 'framer-motion';

export const CardsWrapperStyled = styled.div<{
  mode?: 'vertical' | 'horizontal' | 'grid' | 'wrap';
  maxVertical?: number;
  maxHorizontal?: number;
  align?: 'left' | 'center' | 'right';
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  ${({ mode, maxVertical, maxHorizontal, align }) => {
    if (mode === 'vertical') {
      return css`
        flex-direction: column;
        align-items: ${align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};
        > * {
          max-width: 100%;
        }
        ${maxVertical ? `overflow-y: auto;` : ''}
      `;
    }
    if (mode === 'horizontal') {
      return css`
        flex-direction: row;
        justify-content: ${align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};
        > * {
          max-height: 100%;
        }
        ${maxHorizontal ? `overflow-x: auto;` : ''}
      `;
    }
    if (mode === 'grid') {
      const itemsPerRow = maxHorizontal || 3;
      const gapSize = 1.5;
      const cardWidth = `calc((100% - ${gapSize * (itemsPerRow - 1)}rem) / ${itemsPerRow})`;

      return css`
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: ${align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};
        align-items: stretch;

        > * {
          box-sizing: border-box;
          display: flex;
          min-height: 300px;

          /* Mobile: 1 coluna */
          @media (max-width: 767px) {
            flex: 1 0 100%;
            min-height: auto;
          }

          /* Tablet: 2 colunas */
          @media (min-width: 768px) and (max-width: 1023px) {
            flex: 0 0 calc(50% - 0.75rem);
          }

          /* Desktop: número especificado de colunas */
          @media (min-width: 1024px) {
            flex: 0 0 ${cardWidth};
          }
        }

        ${maxVertical ? `overflow-y: auto;` : ''}
      `;
    }
    if (mode === 'wrap') {
      return css`
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        width: 100%;
        justify-content: ${align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};

        > * {
          flex: 0 0 auto;
          min-width: fit-content;
        }

        /* Limita o número máximo de cards por linha */
        ${maxHorizontal
          ? `
          &::after {
            content: '';
            flex-basis: 100%;
            height: 0;
            order: ${maxHorizontal};
          }

          > *:nth-child(n+${maxHorizontal + 1}) {
            order: ${maxHorizontal + 1};
          }
        `
          : ''}

        ${maxVertical ? `overflow-y: auto;` : ''}
      `;
    }
    return '';
  }}

  /* Garantir responsividade para todos os modos */
  @media (max-width: 767px) {
    > * {
      flex: 1 0 100%;
      min-width: 100%;
    }
  }
`;
export const CardHeaderStyled = styled.div`
  width: 100%;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  background: transparent;
  min-height: 48px;

    @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    & > *:not(:first-child):not(:nth-child(2)) {
      width: 100%;
      background-color:red
    }
  }

`;
export const CardTitleStyled = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
`;

export const CardHeaderMainStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const CardActionStyled = styled.div`
  flex: 1;
  gap: 8px;
  justify-content: flex-end;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const CardAnimateStyled = styled(motion.div)<{ size?: 'sm' | 'md' | 'lg' }>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: box-shadow 0.3s, background 0.3s, transform 0.3s, border 0.3s;
  text-align: justify;
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `padding: 0.75rem; min-width: 140px; min-height: 80px; font-size: 0.9rem;`;
      case 'lg':
        return `padding: 2.5rem; min-width: 320px; min-height: 180px; font-size: 1.15rem;`;
      case 'md':
      default:
        return `padding: 1.5rem; min-width: 220px; min-height: 120px; font-size: 1rem;`;
    }
  }}




`;

export const CardContainerStyled = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  ${styled.themeLayer};

  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  flex: 1;

  /* Responsivo */
  @media (max-width: 767px) {
    min-height: auto;
  }

  transition: box-shadow 0.3s, background 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }


  &:hover > div {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

`;




export const CardContentContainerStyled = styled.div<{
  align?: 'left' | 'center' | 'right';
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;

  justify-content: ${({ align }) =>
    align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};

  > * {
    flex: 0 1 auto;      /* deixa a badge encolher se faltar espaço */
      /* largura mínima para manter consistência */
  }
`;
