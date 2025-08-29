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
import CardHeaderMain from '../../components/card/cardHeaderMain';

import CardTitle from '../../components/card/cardTitle';
import Line from '../../components/line/line';
import CardContent from '../../components/card/cardContent';
import Badge from '../../components/badge/badge';
import { IconCircle } from '../../components/icon/iconCircle';
import Modal from '../../components/modal/modal';
import { useState, type MouseEvent } from 'react';
import Button from '../../components/button/button';
import { CardActions } from '../../components/card/cardActions';

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

  function handleProjectClick(event: MouseEvent<HTMLButtonElement>) {
    const link = event.currentTarget.dataset.link; // Accesses data-id

    // Check if the user is on a mobile device
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      setProjectModal(link);
    }
  }

  function handleCloseModal() {
    setProjectModal(undefined);
  }

  function OpenLinkTab(event: MouseEvent<HTMLButtonElement>) {
    const url = event.currentTarget.dataset.link;
    window.open(url, '_blank', 'noopener,noreferrer');
  }



  return (
    <ViewContainer icon='mdi:folder-outline' name={t('navigation.projects')} color='rgba(255, 0, 0, 0.2)' background='rgba(251, 255, 0, 0.18)'>
      <Title>{t('projects.title')}</Title>
      <CardContainer align="center" mode="grid" maxHorizontal={3}>
        {/* Coap / API */}
        <Card>
          <CardHeader>
            <CardHeaderMain>
              <Icon icon="mdi:react" width={32} height={32} />
              <CardTitle >{t("projects.coap.title")}</CardTitle>
            </CardHeaderMain>
            <CardActions style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='md' data-link="https://coap.ericvitor.com.br/" onClick={handleProjectClick}>
                <Icon icon="mdi:play" width={20} height={20} />
                {t("projects.see")}
              </Button>
              <Button size='md' data-link="https://github.com/EricCoisa/Coap" onClick={OpenLinkTab}>
                <Icon icon="mdi:github" width={20} height={20} />
                {t("projects.repository")}
              </Button>
            </CardActions>
          </CardHeader>

          {t("projects.coap.text")}
          <Line />

          <CardContent align='center'>
            <Badge>
              <IconCircle>
                <Icon icon="simple-icons:styledcomponents" width={16} height={16} />
              </IconCircle>
              <div>Styled-Components</div>
            </Badge>

            <Badge >
              <IconCircle>
                <Icon icon="mdi:react" width={32} height={32} />
              </IconCircle>
              <div>React</div>
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
            <CardHeaderMain>
              <Icon icon="mdi:react" width={32} height={32} />
              <CardTitle>{t("projects.customDeploy.title")}</CardTitle>
            </CardHeaderMain>
            <CardActions style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='md' data-link="https://github.com/EricCoisa/CustomDeploy" onClick={OpenLinkTab}>
                <Icon icon="mdi:github" width={20} height={20} />
                {t("projects.repository")}
              </Button>
            </CardActions>
          </CardHeader>

          {t("projects.customDeploy.text")}
          <Line />
          <CardContent align='center'>
            <Badge>
              <IconCircle>
                <Icon icon="simple-icons:styledcomponents" width={16} height={16} />
              </IconCircle>
              <div>Styled-Components</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="devicon-plain:dotnetcore" width={16} height={16} />
              </IconCircle>
              <div>.NET Core</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="teenyicons:c-sharp-outline" width={16} height={16} />
              </IconCircle>
              <div>C#</div>
            </Badge>


            <Badge>
              <IconCircle>
                <Icon icon="mdi:react" width={32} height={32} />
              </IconCircle>
              <div>React</div>
            </Badge>

            <Badge>
              <IconCircle>
                <Icon icon="akar-icons:redux-fill" width={16} height={16} />
              </IconCircle>
              <div>Redux</div>
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardHeaderMain>
              <Icon icon="mdi:dot-net" width={32} height={32} />
              <CardTitle>NetCore Api StarterPack</CardTitle>
            </CardHeaderMain>
            <CardActions style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='md' data-link="https://github.com/EricCoisa/AspNetCoreApiBase" onClick={OpenLinkTab}>
                <Icon icon="mdi:github" width={20} height={20} />
                {t("projects.repository")}
              </Button>
            </CardActions>
          </CardHeader>

          <div style={{ textAlign: 'left' }}>
            {t("projects.netcoreStarter.text").split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}</div>
          <Line />
          <CardContent align='center'>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:dot-net" width={16} height={16} />
              </IconCircle>
              <div>.NET Core 8.0</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:docker" width={16} height={16} />
              </IconCircle>
              <div>Docker</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:language-csharp" width={16} height={16} />
              </IconCircle>
              <div>C#</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:lock" width={16} height={16} />
              </IconCircle>
              <div>JWT Auth</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:translate" width={16} height={16} />
              </IconCircle>
              <div>Localizer</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:test-tube" width={16} height={16} />
              </IconCircle>
              <div>Testes</div>
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
