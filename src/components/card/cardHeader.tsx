import React from 'react';
import { CardHeaderStyled } from './card.styles';

export interface CardHeaderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <CardHeaderStyled style={style}>{children}</CardHeaderStyled>;
}

export default CardHeader;
