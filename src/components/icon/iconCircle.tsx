import styled from 'wrapper-styled-components';

const IconCircleStyled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.text || '#3498db'};
  background: ${({ color, theme }) => color || theme.colors.primary};
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;


export function IconCircle({ children }: { children: React.ReactNode }) {
  return <IconCircleStyled className='icon-circle'>{children}</IconCircleStyled>;
}