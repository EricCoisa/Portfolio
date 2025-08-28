import React from 'react';
import { CardActionStyled } from './card.styles';

export interface CardActionsProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardActions({ children, style }: CardActionsProps) {
  return <CardActionStyled style={style}>{children}</CardActionStyled>;
}

export default CardActions;
