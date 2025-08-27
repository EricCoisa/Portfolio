
import styled from 'wrapper-styled-components';
import { ColorContainer } from '../global/colorContainer/colorContainer';

export const FooterContainer = styled(ColorContainer).attrs({ as: "footer" })`
  ${styled.themeLayer};
  width: 100%;
  padding: clamp(1.5rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: ${({ theme }) => theme.blur};
  margin-top: auto;
`;

export const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.5rem);
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  line-height: 1.5;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 1.5rem);
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary + '11'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
