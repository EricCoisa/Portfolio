import React from 'react';
import { CardHeaderMainStyled } from './card.styles';

export interface CardHeaderMainProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardHeaderMain({ children, style }: CardHeaderMainProps) {
  return <CardHeaderMainStyled style={style}>{children}</CardHeaderMainStyled>;
}

export default CardHeaderMain;
