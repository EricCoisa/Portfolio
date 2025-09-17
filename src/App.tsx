import './App.css';
import Home from './views/home/home.tsx';
import { ThemeProvider } from 'styled-components';
import { connectUtil } from './utils/reduxUtil';
import type { PropsFromRedux } from './utils/reduxUtil';
import type { RootStateBase } from './store/rootReducer';
import { SetCurrentTheme, SetCurrentView, SetReduxVisualizer } from './store/application/actions/applicationAction';
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import { AppLayout, MainContent } from './components/layout/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import Background from './components/background/background.tsx';
import GlassNoise from './components/background/GlassNoise.tsx';
import About from './views/about/about.tsx';
import Projects from './views/projects/projects.tsx';
import Skills from './views/skills/skills.tsx';
import { useEffect, useRef } from 'react';
import ReduxVisualizer from 'redux-visualizer';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentTheme: state.ApplicationReducer.currentTheme,
    currentView: state.ApplicationReducer.currentView,
    view: state.ApplicationReducer.views,
    reduxVisualizer: state.ApplicationReducer.reduxVisualizer,
  }),
  { SetCurrentTheme, SetCurrentView, SetReduxVisualizer }
);

export type AppProps = PropsFromRedux<typeof connector>;

function App(props: AppProps) {
  const theme = props.currentTheme;
  const currentViewRef = useRef(props.currentView);

  useEffect(() => {
    currentViewRef.current = props.currentView;
  }, [props.currentView]);

useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          if (currentViewRef.current?.byClick === true) {
            return;
          }
          const viewIds = props.view.map(v => v.name);
          let closestId: string | null = null;
          let minDistance = Infinity;
          const viewportCenter = window.innerHeight / 2;
          for (const id of viewIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elCenter - viewportCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestId = id;
            }
          }
          if (closestId && closestId !== currentViewRef.current?.name) {
            props.SetCurrentView(closestId, false);
          }
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [props.SetCurrentView, props.view]);

  function handleReduxVisualizer(){
    props.SetReduxVisualizer(false);
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppLayout>
        <Header />
        <MainContent>
          <Home />
          <About />
          <Skills />
          <Projects />
        </MainContent>
        <Footer />
      </AppLayout>
      <ReduxVisualizer
        isOpen={props.reduxVisualizer}
        onClose={handleReduxVisualizer}
        overlay={false}
      />
      <Background />
      <GlassNoise />
    </ThemeProvider>
  );
}

const ConnectedApp = connector(App);
export default ConnectedApp;
