import React from 'react';
import { CardAnimateStyled, CardContainerStyled } from './card.styles';



export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: CardSize;
}

export function Card({ children, style, size = 'md' }: CardProps) {
  return (
    <CardContainerStyled size={size}>
      <CardAnimateStyled
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        style={style}
      >
        {children}
      </CardAnimateStyled>
    </CardContainerStyled>
  );
}

export default Card;
