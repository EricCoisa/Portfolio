import styled from 'wrapper-styled-components';
import type { SkillsProps } from './skills';

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
  border-radius: ${({ theme }) => theme.borderRadius};
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

const SkillBannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  overflow: visible;
  @media (max-width: 768px) {

  }
  
  @media (max-width: 480px) {

  }
`;

const ViewBannerContainer = styled.div<SkillsProps>`
${styled.themeLayer};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 2rem clamp(1rem, 4vw, 2rem) 2rem;
  box-sizing: border-box;
  width: 100%;

  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 25px 1rem 2rem;
    min-height: calc(100vh - 56px);
  }

  @media (max-width: 480px) {
    padding: 72px 1rem 1rem;
  }
`;

const SkillBannerItem = styled.div`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  display:flex;
  justify-content: center;
  align-items:center;
  width:100px;
  height:100px;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    transform:  scale(1.05);
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }



  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
  
  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
  }
`;

export { Title, Button, SkillBannerContainer, SkillBannerItem, ViewBannerContainer };
