import { useState, useEffect } from 'react';
import { HeaderContainer, Avatar, Nav, NavButton, Title, TitleContainer } from './header.styles';

import Switch from '../switch/Switch';
import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView, SetCurrentLanguage, SetCurrentTheme, SetReduxVisualizer } from '../../store/application/actions/applicationAction';
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
    reduxVisualizer: state.ApplicationReducer.reduxVisualizer,
  }),
  { SetCurrentView, SetCurrentLanguage, SetCurrentTheme, SetReduxVisualizer}
);

export type HeaderProps = PropsFromRedux<typeof connector>;

function Header(props: HeaderProps) {
  const { t } = useTranslation();
  const [isAtTop, setIsAtTop] = useState(true);
  const [reactScanEnabled, setReactScanEnabled] = useState(false);
  const isMiniHeader = (
    (isAtTop == true && props.currentTheme.header.isOnTop.width != "100%" ||
      isAtTop == false && props.currentTheme.header.isOnScroll.width != "100%")
  )

  // Detecta scroll para mudar tamanho do header
  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < 10);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    //remove o foco do elemento ativo
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, [props.currentView]);


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
    props.SetCurrentView(view, true);
    // Scroll suave para o container correspondente
    const el = document.getElementById(view);
    if (el) {
      const observer = new window.IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          props.SetCurrentView(view, false);
          obs.disconnect();
        }
      }, { threshold: 0.6 }); // 60% do elemento visível
      observer.observe(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleLanguageSwitch() {
    const nextLang = props.currentLanguage === Languages.English ? Languages.Portuguese : Languages.English;
    props.SetCurrentLanguage(nextLang);
  }

  function handleReduxVisualizer() {
    props.SetReduxVisualizer(!props.reduxVisualizer);
  }

  function handleThemeSwitch(theme: string) {
    const value = props.themeList.find(t => t.name === theme);
    if (!value) {
      return;
    }
    props.SetCurrentTheme(value);
  }


  function renderSettingsTrigger(toggle: () => void, open: boolean) {
    return (
      <NavButton
        active={false}
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon icon={"mdi:settings"} width={24} height={24} />

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
        {/* Avatar só aparece em desktop */}
        {!window.matchMedia('(max-width: 768px)').matches && !isMiniHeader && (
          <TitleContainer>
            <Avatar src="/vite.svg" alt="Portfolio Avatar" />
            <Title>Éric Vitor</Title>
          </TitleContainer>
        )}

        {/* Desktop Navigation */}
        <Nav>
          {props.headerButton.map(function renderNavItem(item, key) {

            return (
              <NavButton
                key={key}
                active={props.currentView?.name === item.name}
                onClick={createNavClickHandler(item.name)}
              >
                {isMiniHeader ? <Icon icon={item.icon} width={24} height={24} /> : item.name}
              </NavButton>
            );
          })}

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
            }, {
              label: t(`header.reactScan`),
              action: (
                <Switch
                  checked={reactScanEnabled}
                  onChange={handleReactScan}
                  label={reactScanEnabled ? "On" : "Off"}
                />
              )
            },
            {
              label: t(`header.reduxVisualizer`),
              action: (
                <Switch
                  checked={props.reduxVisualizer}
                  onChange={handleReduxVisualizer}
                  label={props.reduxVisualizer ? "On" : "Off"}
                />
              )
            }



            ]}
          />
        </Nav>

      </HeaderContainer>


    </>
  );
}

const ConnectedHeader = connector(Header);
export default ConnectedHeader;
