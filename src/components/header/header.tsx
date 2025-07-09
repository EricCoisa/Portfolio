import React, { useState } from 'react';
import View from '../basic/view';
import * as S from './headerStyle';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Portfolio' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View>
      <S.HeaderContainer>
        <S.Logo>
          <View>{title}</View>
        </S.Logo>
        
        <S.MenuIcon isActive={menuOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </S.MenuIcon>
        
        <S.Navigation isOpen={menuOpen}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Skills</li>
            <li>Contact</li>
          </ul>
        </S.Navigation>
      </S.HeaderContainer>
    </View>
  );
};

export default Header;
