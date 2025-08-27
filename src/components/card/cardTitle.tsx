import React from 'react';
import { CardTitleStyled } from './card.styles';

export interface CardTitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardTitle({ children, style }: CardTitleProps) {
  return <CardTitleStyled style={style}>{children}</CardTitleStyled>;
}

export default CardTitle;
