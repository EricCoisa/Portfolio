import { useState, useEffect } from 'react';
import { HeaderContainer, Avatar, Nav, NavButton, Switches, MobileNav, MobileNavButton, MenuToggle } from './header.styles';

import Switch from '../switch/Switch';
import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView, SetCurrentLanguage, SetCurrentTheme } from '../../store/application/actions/applicationAction';
import { Languages } from '../../types/languages';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import DropdownMenu from '../dropdownMenu/dropdownMenu';
import Options from '../options/options';
import { scan } from "react-scan";


const connector = connectUtil(
  (state: RootStateBase) => ({
    currentView: state.ApplicationReducer.currentView,
    currentLanguage: state.ApplicationReducer.currentLanguage,
    currentTheme: state.ApplicationReducer.currentTheme,
    themeList: state.ApplicationReducer.themeList,
    headerButton: state.ApplicationReducer.views,
  }),
  { SetCurrentView, SetCurrentLanguage, SetCurrentTheme }
);

export type HeaderProps = PropsFromRedux<typeof connector>;

function Header(props: HeaderProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [reactScanEnabled, setReactScanEnabled] = useState(false);

  // Detecta scroll para mudar tamanho do header
  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < 10);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


    function handleReactScan() {
      setReactScanEnabled(!reactScanEnabled);
    }

    useEffect(() => {
        scan({
          enabled: reactScanEnabled,
          showToolbar: reactScanEnabled
          });
    }, [reactScanEnabled]);

  function handleNavClick(view: string) {
    props.SetCurrentView(view);
    setMobileMenuOpen(false);
    // Scroll suave para o container correspondente
    const el = document.getElementById(view);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleLanguageSwitch() {
    const nextLang = props.currentLanguage === Languages.English ? Languages.Portuguese : Languages.English;
    props.SetCurrentLanguage(nextLang);
  }

  function handleThemeSwitch(theme: string) {
    const value = props.themeList.find(t => t.name === theme);
    if (!value) {
      return;
    }
    props.SetCurrentTheme(value);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function renderSettingsTrigger(toggle: () => void, open: boolean) {
    return (
      <NavButton
        active={false}
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {t('header.settings')} <Icon icon="mdi:chevron-down" width="16" height="16" />
      </NavButton>
    );
  }

  function createNavClickHandler(itemKey: string) {
    return function handleSpecificNavClick() {
      handleNavClick(itemKey);
    };
  }

  return (
    <>
      <HeaderContainer $isAtTop={isAtTop}>
        <Avatar src="/public/vite.svg" alt="Portfolio Avatar" />

        {/* Desktop Navigation */}
        <Nav>
          {props.headerButton.map(function renderNavItem(item, key) {
            return (
              <NavButton
                key={key}
                active={props.currentView === item.name}
                onClick={createNavClickHandler(item.name)}
              >
                {item.name}
              </NavButton>
            );
          })}
        </Nav>

        <Switches>
          {/* Menu Mobile */}
          <MenuToggle
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} width="24" height="24" />
          </MenuToggle>

          {/* Settings Dropdown */}
          <DropdownMenu
            trigger={renderSettingsTrigger}
            items={[{
              label: t('language.switch'),
              action: (
                <Switch
                  checked={props.currentLanguage === Languages.English}
                  onChange={handleLanguageSwitch}
                  label={props.currentLanguage === Languages.English ? Languages.English : Languages.Portuguese}
                />
              )
            }, {
              label: t(`theme.theme`),
              action: (
                <Options
                  options={props.themeList.map(theme => ({
                    label: t(`theme.${theme.name}`),
                    value: theme.name
                  }))}
                  selected={props.currentTheme.name}
                  onSelect={handleThemeSwitch}
                />
              )
            },{
              label: t(`header.reactScan`),
              action: (
               <Switch
                 checked={reactScanEnabled}
                 onChange={handleReactScan}
                 label={reactScanEnabled ? "On" : "Off"}
               />
              )
            }
          
          
          
          ]}
          />
        </Switches>
      </HeaderContainer>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen}>
        {props.headerButton.map(function renderMobileNavItem(item, key) {
          return (
            <MobileNavButton
              key={key}
              active={props.currentView === item.name}
              onClick={createNavClickHandler(item.name)}
            >
              {item.name}
            </MobileNavButton>
          );
        })}
      </MobileNav>
    </>
  );
}

const ConnectedHeader = connector(Header);
export default ConnectedHeader;
