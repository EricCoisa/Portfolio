import React from 'react';
import { BadgeContainerStyled } from './badge.styles';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  color?: string;
  size?: BadgeSize;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge({ color, size = 'sm', children, style }: BadgeProps) {
  return (
    <BadgeContainerStyled color={color} size={size} style={style}>
      {children}
    </BadgeContainerStyled>
  );
}

export default Badge;
