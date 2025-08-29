import styled from 'wrapper-styled-components';
export const BadgeContainerStyled = styled.span<{
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}>`
  ${styled.themeLayer};
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-weight: 500;
  background: ${({ color, theme }) => color || theme.badge.background};
  color: ${({ theme }) => theme.badge.color};
  border: 1px solid ${({ color, theme }) => color || theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  letter-spacing: 0.02em;
  user-select: none;
  white-space: nowrap;
  transition: filter 0.2s, border-color 0.2s, background 0.2s;
  cursor: default;

  ${({ size }) =>
    size === 'sm'
      ? `
        font-size: 0.7rem;
        padding: 0.15rem 0.4rem;
        min-height: 20px;
      `
      : size === 'lg'
      ? `
        font-size: 0.9rem;
        padding: 0.35rem 0.8rem;
        min-height: 28px;
      `
      : `
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
        min-height: 24px;
      `};

  & > .icon-circle:first-child {
    margin-left: -0.25em;
  }
  & > .icon-circle:last-child {
    margin-right: -0.25em;
  }

  &:hover {
    filter: saturate(1.5) brightness(1.1);
    border-color: ${({ color, theme }) => color || theme.colors.primary};
    background: ${({ color, theme }) => color || theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;
