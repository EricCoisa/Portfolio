import React from 'react';

import { CardContainerStyled } from './card.styles';


export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: CardSize;
}

export function Card({ children, style, size = 'md' }: CardProps) {
  return <CardContainerStyled style={style} size={size}>{children}</CardContainerStyled>;
}

export default Card;
