import { useTranslation } from 'react-i18next';
import { Title, Text } from './about.styles';

import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import  ViewContainer, { type ViewMaskProps }  from '../../components/global/viewContainer/viewContainer';

const connector = connectUtil(
  (state: RootStateBase) => ({
     currentView: state.ApplicationReducer.currentView,
     currentTheme: state.ApplicationReducer.currentTheme,
  }),
  { SetCurrentView }
);

export type AboutProps = PropsFromRedux<typeof connector>;

function About(props: AboutProps) {
  const { t } = useTranslation();

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  const srcMobile = isMobile ? 'drawnMobile' : 'drawn';
  const srcTheme = props.currentTheme.name === 'Default' ? '' : '_white';
  const srcImage = './mask/' + srcMobile + srcTheme + '.webp';
  // Detect mobile

  console.log('srcImage:', srcImage);
  
  const maskConfig = isMobile
    ? { src: srcImage, backgroundSize: 'cover', position: 'center', opacity: "0.5" }
    : { src: srcImage, backgroundSize: 'cover', position: 'right', opacity: "0.5"  } as ViewMaskProps;

  return (
    <ViewContainer mask={maskConfig} icon='mdi:information-outline' name={t('navigation.about')} color='rgba(104, 192, 32, 0.2)' background='rgba(30,144,255,0.18)'>
      <Title>{t('about.title')}</Title>
      <Text>{t('about.text')}</Text>
    </ViewContainer>
  );
}

const ConnectedAbout = connector(About);
export default ConnectedAbout;
