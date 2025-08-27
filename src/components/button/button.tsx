import React from 'react';
import { ButtonContainer, ButtonIcon, ButtonLabel } from './button.styles';
import { Icon } from '@iconify/react/dist/iconify.js';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: ButtonSize;
}

function Button({ children, size = 'sm', ...rest }: ButtonProps) {
  return (
    <ButtonContainer size={size} {...rest}>
      {children}
    </ButtonContainer>
  );
}

function IconButton({ iconName }: { iconName: string }) {
  return <ButtonIcon><Icon icon={iconName} width="22" height="22" /></ButtonIcon>;
}

function LabelButton({ children }: { children: React.ReactNode }) {
  return <ButtonLabel>{children}</ButtonLabel>;
}

Button.Icon = IconButton;
Button.Label = LabelButton;

export default Button;
