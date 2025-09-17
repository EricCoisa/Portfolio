import React from 'react';
import { CardsWrapperStyled } from './card.styles';


export interface CardContainerProps {
  children: React.ReactNode;
  mode?: 'vertical' | 'horizontal' | 'grid' | 'wrap';
  maxVertical?: number;
  maxHorizontal?: number;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  chunkSize?: number; // Novo: controla o máximo de cards por linha
}


export function CardContainer({ children, mode = 'grid', maxVertical, maxHorizontal, align = 'left', style, chunkSize }: CardContainerProps) {
  // Se chunkSize for definido, divide os filhos em linhas de até chunkSize cards
  if (chunkSize && React.Children.count(children) > chunkSize) {
    const childArr = React.Children.toArray(children);
    const rows = [];
    for (let i = 0; i < childArr.length; i += chunkSize) {
      rows.push(childArr.slice(i, i + chunkSize));
    }
    return (
      <>
        {rows.map((row, idx) => (
          <CardsWrapperStyled
            key={idx}
            mode={mode === 'grid' ? 'horizontal' : mode}
            maxVertical={maxVertical}
            maxHorizontal={maxHorizontal}
            align={align}
            style={{ ...style, marginBottom: 24 }}
          >
            {row}
          </CardsWrapperStyled>
        ))}
      </>
    );
  }
  // Caso padrão
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
