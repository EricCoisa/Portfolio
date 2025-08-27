import styled from 'wrapper-styled-components';

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 7vw, 2rem);
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  padding: clamp(0.625rem, 2vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem);
  font-size: clamp(0.875rem, 2vw, 1rem);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-height: 48px;
  min-width: 120px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}CC;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    min-width: 140px;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
  }
`;

export { Title, Button };
