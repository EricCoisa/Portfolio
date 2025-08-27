import { useTranslation } from 'react-i18next';
import { Title, Button } from './about.styles';

import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import  ViewContainer  from '../../components/global/viewContainer/viewContainer';
import Modal from '../../components/modal/modal';
import { useState } from 'react';

const connector = connectUtil(
  (state: RootStateBase) => ({
     currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type AboutProps = PropsFromRedux<typeof connector>;

function About(props: AboutProps) {
  const { t } = useTranslation();
  const [s, setS] = useState(false);
  function handleChangeToAbout() {
    setS(true)
    props.SetCurrentView('about');
  }
  return (
    <ViewContainer name={t('navigation.about')} color='rgba(104, 192, 32, 0.2)' background='rgba(30,144,255,0.18)'>
      <Title>{t('about.title')}</Title>
      <Button onClick={handleChangeToAbout}>
        Ir para About
      </Button>
      <Modal size='lg' onClose={() => {setS(!s)}} isOpen={s}>teste</Modal>
    </ViewContainer>
  );
}

const ConnectedAbout = connector(About);
export default ConnectedAbout;
