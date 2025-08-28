import { useTranslation } from 'react-i18next';
import { Title } from './home.styles';

import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import ViewContainer from '../../components/global/viewContainer/viewContainer';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type HomeProps = PropsFromRedux<typeof connector>;

function Home(_props: HomeProps) {
  const { t } = useTranslation();

  return (
    <ViewContainer maskSrc='./mask/teste1.png' name={t('navigation.home')} color='rgba(155,89,182,0.20)' background='rgba(30,144,255,0.18)'>
      <Title>{t('home.title')}</Title>
    </ViewContainer>
  );
}



const ConnectedHome = connector(Home);
export default ConnectedHome;
