import styled from 'wrapper-styled-components';

export const BadgeContainerStyled = styled.span<{ color?: string; size?: 'sm' | 'md' | 'lg' }>`
  ${styled.themeLayer};
  display: flex;
  align-items: center;
  border-radius: 999px;
  font-weight: 500;
  background: ${({ color, theme }) => color || theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ color, theme }) => color || theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  letter-spacing: 0.02em;
  user-select: none;
  white-space: nowrap;
  transition: filter 0.2s, border-color 0.2s, background 0.2s;
  cursor: default;
  font-size: ${({ size }) => size === 'sm' ? '0.8em' : size === 'lg' ? '1.15em' : '0.95em'};
  padding: ${({ size }) => size === 'sm' ? '0.12em 0.35em' : size === 'lg' ? '0.28em 0.85em' : '0.18em 0.55em'};
  & > .icon-circle:first-child {
    margin-left: -0.55em;
  }
  & > .icon-circle:last-child {
    margin-right: -0.55em;
  }
  &:hover {
    filter: saturate(1.5) brightness(1.1);
    border-color: ${({ color, theme }) => color || theme.colors.primary};
    background: ${({ color, theme }) => color || theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;
