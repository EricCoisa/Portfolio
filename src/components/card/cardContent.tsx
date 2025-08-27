import React from 'react';
import { CardContentContainerStyled } from './card.styles';

export type CardContentMode = 'vertical' | 'horizontal' | 'wrap';


export type CardContentAlign = 'left' | 'center' | 'right';

export interface CardContentProps {
  children: React.ReactNode;
  mode?: CardContentMode;
  maxVertical?: number;
  maxHorizontal?: number;
  align?: CardContentAlign;
  style?: React.CSSProperties;
}

export function CardContent({ children, mode = 'vertical', maxVertical, maxHorizontal, align = 'left', style }: CardContentProps) {
  return (
    <CardContentContainerStyled
      mode={mode}
      maxVertical={maxVertical}
      maxHorizontal={maxHorizontal}
      align={align}
      style={style}
    >
      {children}
    </CardContentContainerStyled>
  );
}

export default CardContent;
