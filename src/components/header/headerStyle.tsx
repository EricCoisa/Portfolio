import styled from 'styled-components';
import View from '../basic/view';

export const HeaderContainer = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const Logo = styled(View)`
  font-size: 1.5rem;
  font-weight: 700;
  
  a {
    color: #333;
    text-decoration: none;
  }
`;

export const MenuIcon = styled(View)<{ isActive: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #333;
    transition: all 0.3s ease;
  }
  
  ${props => props.isActive && `
    span:first-child {
      transform: rotate(45deg) translate(6px, 6px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:last-child {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`;

export const Navigation = styled(View)<{ isOpen: boolean }>`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-left: 2rem;
  }
  
  a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #0070f3;
    }
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    
    ${props => props.isOpen && `
      height: 250px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    `}
    
    ul {
      flex-direction: column;
      padding: 1rem 2rem;
    }
    
    li {
      margin: 1rem 0;
      margin-left: 0;
    }
  }
`;
