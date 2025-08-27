import { useTranslation } from 'react-i18next';
import { Title, Button } from './home.styles';

import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import ViewContainer from '../../components/global/viewContainer/viewContainer';
import CardContent from '../../components/card/cardContent';
import Card from '../../components/card/card';
import { Icon } from '@iconify/react/dist/iconify.js';
import { IconCircle } from '../../components/icon/iconCircle';
import CardTitle from '../../components/card/cardTitle';
import CardHeader from '../../components/card/cardHeader';
import CardContainer from '../../components/card/cardContainer';
import Line from '../../components/line/line';
import Badge from '../../components/badge/badge';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type HomeProps = PropsFromRedux<typeof connector>;

function Home(props: HomeProps) {
  const { t } = useTranslation();

  return (
    <ViewContainer name={t('navigation.home')} color='rgba(155,89,182,0.20)' background='rgba(30,144,255,0.18)'>
      <Title>{t('home.title')}</Title>
    </ViewContainer>
  );
}

const ConnectedHome = connector(Home);
export default ConnectedHome;
