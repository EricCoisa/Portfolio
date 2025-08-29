import { useTranslation } from 'react-i18next';
import { Title, Text } from './about.styles';

import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import  ViewContainer  from '../../components/global/viewContainer/viewContainer';

const connector = connectUtil(
  (state: RootStateBase) => ({
     currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type AboutProps = PropsFromRedux<typeof connector>;

function About(_props: AboutProps) {
  const { t } = useTranslation();

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const maskConfig = isMobile
    ? { src: './mask/drawnMobile.webp', backgroundSize: 'cover', position: 'right' }
    : { src: './mask/drawn.webp', backgroundSize: 'cover', position: 'right' };

  return (
    <ViewContainer mask={maskConfig} icon='mdi:information-outline' name={t('navigation.about')} color='rgba(104, 192, 32, 0.2)' background='rgba(30,144,255,0.18)'>
      <Title>{t('about.title')}</Title>
      <Text>{t('about.text')}</Text>
    </ViewContainer>
  );
}

const ConnectedAbout = connector(About);
export default ConnectedAbout;
