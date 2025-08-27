import { useTranslation } from 'react-i18next';
import { Title } from './projects.styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView } from '../../store/application/actions/applicationAction';
import ViewContainer from '../../components/global/viewContainer/viewContainer';
import CardContainer from '../../components/card/cardContainer';
import Card from '../../components/card/card';
import CardHeader from '../../components/card/cardHeader';

import CardTitle from '../../components/card/cardTitle';
import Line from '../../components/line/line';
import CardContent from '../../components/card/cardContent';
import Badge from '../../components/badge/badge';
import { IconCircle } from '../../components/icon/iconCircle';
import Modal from '../../components/modal/modal';
import { useState, type MouseEvent } from 'react';
import Button from '../../components/button/button';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type HomeProps = PropsFromRedux<typeof connector>;

function Projects(_props: HomeProps) {
  const [projectModal, setProjectModal] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  function handleProjectClick(event : MouseEvent<HTMLButtonElement>) {
    const link = event.currentTarget.dataset.link; // Accesses data-id
    setProjectModal(link);
  }

  function handleCloseModal() {
    setProjectModal(undefined);
  }
  
  function OpenLinkTab(event : MouseEvent<HTMLButtonElement>) {
    const url = event.currentTarget.dataset.link;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <ViewContainer name={t('navigation.projects')} color='rgba(255, 0, 0, 0.2)' background='rgba(251, 255, 0, 0.18)'>
      <Title>{t('projects.title')}</Title>
      <CardContainer align="center" mode="grid" maxHorizontal={3}>
        {/* Coap / API */}
        <Card>
          <CardHeader>
            <Icon icon="mdi:react" width={32} height={32} />
            <CardTitle>{t("projects.coap.title")}</CardTitle>
          </CardHeader>
          {t("projects.coap.text")}
          <Line />
          <CardContent align='center' mode="horizontal" maxVertical={2} maxHorizontal={2}>
            <Button data-link="https://coap.ericvitor.com.br/" onClick={handleProjectClick}>
              <Icon icon="mdi:play" width={20} height={20} style={{ marginRight: 8 }} />
              {t("projects.see")}
            </Button>

            <Button data-link="https://github.com/EricCoisa/Coap" onClick={OpenLinkTab}>
              <Icon icon="mdi:github" width={20} height={20} style={{ marginRight: 8 }} />
              {t("projects.repository")}
            </Button>
          </CardContent>

          <Line />
          <CardContent align='center' mode="wrap" maxVertical={3} maxHorizontal={3}>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:react" width={32} height={32} />
              </IconCircle>
              <div>React</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="simple-icons:styledcomponents" width={16} height={16} />
              </IconCircle>
              <div>Styled-Components</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="akar-icons:redux-fill" width={16} height={16} />
              </IconCircle>
              <div>Redux</div>
            </Badge>
          </CardContent>
        </Card>

        {/* CustomDeploy / API */}
        <Card>
          <CardHeader>
            <Icon icon="mdi:react" width={32} height={32} />
            <CardTitle>{t("projects.customDeploy.title")}</CardTitle>
          </CardHeader>
          {t("projects.customDeploy.text")}
          <Line />
          <CardContent align='center' mode="wrap" maxVertical={3} maxHorizontal={3}>
            <Badge>
              <IconCircle>
                <Icon icon="teenyicons:c-sharp-outline" width={16} height={16} />
              </IconCircle>
              <div>C#</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="devicon-plain:dotnetcore" width={16} height={16} />
              </IconCircle>
              <div>.NET Core</div>
            </Badge>

            <Badge>
              <IconCircle>
                <Icon icon="mdi:react" width={32} height={32} />
              </IconCircle>
              <div>React</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="simple-icons:styledcomponents" width={16} height={16} />
              </IconCircle>
              <div>Styled-Components</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="akar-icons:redux-fill" width={16} height={16} />
              </IconCircle>
              <div>Redux</div>
            </Badge>
          </CardContent>
        </Card>
      </CardContainer>
      
      <Modal size='xg' isOpen={projectModal != undefined} onClose={handleCloseModal}>
        <Button style={{ position: 'absolute', top: -20, right: -20, minWidth: 0, padding: 8 }} onClick={handleCloseModal} aria-label={t('modal.close')}>
          <Icon icon="mdi:close" width={24} height={24} />
        </Button>
        <iframe style={{ border: 'none', width: '100%', height: '100%' }} src={projectModal} title="Demo" />
      </Modal>
    </ViewContainer>
  );
}

const ConnectedProjects = connector(Projects);
export default ConnectedProjects;
