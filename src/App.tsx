import './App.css';
import Home from './views/home/home.tsx';
import { ThemeProvider } from 'styled-components';
import { connectUtil } from './utils/reduxUtil';
import type { PropsFromRedux } from './utils/reduxUtil';
import type { RootStateBase } from './store/rootReducer';
import { SetCurrentTheme } from './store/application/actions/applicationAction';
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import { AppLayout, MainContent } from './components/layout/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import Background from './components/background/background.tsx';
import GlassNoise from './components/background/GlassNoise.tsx';
import About from './views/about/about.tsx';
import Projects from './views/projects/projects.tsx';
import Skills from './views/skills/skills.tsx';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentTheme: state.ApplicationReducer.currentTheme,
  }),
  { SetCurrentTheme }
);

export type AppProps = PropsFromRedux<typeof connector>;

function App(props: AppProps) {
  const theme = props.currentTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppLayout>
        <Header/>
        <MainContent>
          <Home />
          <About />
          <Skills />
          <Projects />
        </MainContent>
        <Footer />
      </AppLayout>
      <Background />
      <GlassNoise />
    </ThemeProvider>
  );
}

const ConnectedApp = connector(App);
export default ConnectedApp;
