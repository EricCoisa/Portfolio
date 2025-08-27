import React from 'react';
import { CardsWrapperStyled } from './card.styles';

export interface CardContainerProps {
  children: React.ReactNode;
  mode?: 'vertical' | 'horizontal' | 'grid' | 'wrap';
  maxVertical?: number;
  maxHorizontal?: number;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}

export function CardContainer({ children, mode = 'grid', maxVertical, maxHorizontal, align = 'left', style }: CardContainerProps) {
  return (
    <CardsWrapperStyled
      mode={mode}
      maxVertical={maxVertical}
      maxHorizontal={maxHorizontal}
      align={align}
      style={style}
    >
      {children}
    </CardsWrapperStyled>
  );
}

export default CardContainer;
