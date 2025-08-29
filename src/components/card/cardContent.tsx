import React from 'react';
import { CardContentContainerStyled } from './card.styles';

export type CardContentMode = 'vertical' | 'horizontal' | 'wrap';


export type CardContentAlign = 'left' | 'center' | 'right';

export interface CardContentProps {
  children: React.ReactNode;
  align?: CardContentAlign;
  style?: React.CSSProperties;
}

export function CardContent({ children, align = 'left', style }: CardContentProps) {
  return (
    <CardContentContainerStyled
      align={align}
      style={style}
    >
      {children}
    </CardContentContainerStyled>
  );
}

export default CardContent;
