import styled from 'wrapper-styled-components';

export const ButtonContainer = styled.button<{ size?: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 8px);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;
  width: ${({ size }) => size === 'sm' ? '110px' : size === 'lg' ? '200px' : '140px'};
  height: ${({ size }) => size === 'sm' ? '36px' : size === 'lg' ? '56px' : '44px'};
  font-size: ${({ size }) => size === 'sm' ? '0.85rem' : size === 'lg' ? '1.15rem' : '1rem'};
  padding: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary + 'CC'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    padding: ${({ size }) => size === 'sm' ? '6px 10px' : size === 'lg' ? '12px 22px' : '10px 16px'};
    font-size: ${({ size }) => size === 'sm' ? '0.8rem' : size === 'lg' ? '1rem' : '0.9rem'};
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

export const ButtonLabel = styled.span`
  display: flex;
  align-items: center;
`;
