import { useTranslation } from 'react-i18next';
import { Title } from './projects.styles';
import { Icon } from '@iconify/react/dist/iconify.js';
import { connectUtil } from '../../utils/reduxUtil';
import type { PropsFromRedux } from '../../utils/reduxUtil';
import type { RootStateBase } from '../../store/rootReducer';
import { SetCurrentView, SetReduxVisualizer } from '../../store/application/actions/applicationAction';
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
  { SetCurrentView, SetReduxVisualizer }
);

export type HomeProps = PropsFromRedux<typeof connector>;

function Projects(props: HomeProps) {
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

  function handleReduxVisualizer() {
    props.SetReduxVisualizer(true);
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


      <CardContainer align="center" mode="grid" chunkSize={3}>
        {/* Coap / API */}
        <Card key="coap">
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
        {/* ReduxView */}
        <Card key="reduxview">
          <CardHeader>
            <CardHeaderMain>
              <Icon icon="akar-icons:redux-fill" width={32} height={32} />
              <CardTitle>{t("projects.reduxView.title")}</CardTitle>
            </CardHeaderMain>
            <CardActions style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='md' onClick={handleReduxVisualizer}>
                <Icon icon="mdi:play" width={20} height={20} />
                {t("projects.see")}
              </Button>
              <Button size='md' data-link="https://github.com/EricCoisa/redux-visualizer" onClick={OpenLinkTab}>
                <Icon icon="mdi:github" width={20} height={20} />
                {t("projects.repository")}
              </Button>
            </CardActions>
          </CardHeader>
          {t("projects.reduxView.text")}
          <Line />
          <CardContent align='center'>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:language-javascript" width={16} height={16} />
              </IconCircle>
              <div>JavaScript</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:language-typescript" width={16} height={16} />
              </IconCircle>
              <div>TypeScript</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="akar-icons:redux-fill" width={16} height={16} />
              </IconCircle>
              <div>Redux</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:react" width={16} height={16} />
              </IconCircle>
              <div>React</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:css3" width={16} height={16} />
              </IconCircle>
              <div>CSS</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:npm" width={16} height={16} />
              </IconCircle>
              <div>NPM</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:vite" width={16} height={16} />
              </IconCircle>
              <div>Vite</div>
            </Badge>
          </CardContent>
        </Card>
        {/* CustomDeploy / API */}
        <Card key="customdeploy">
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
        {/* NetCore Api StarterPack */}
        <Card key="netcore">
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
            ))}
          </div>
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

        {/* GraphQLAPI */}
        <Card key="graphqlapi">
          <CardHeader>
            <CardHeaderMain>
              <Icon icon="mdi:graphql" width={32} height={32} />
              <CardTitle>{t("projects.graphQLAPI.title")}</CardTitle>
            </CardHeaderMain>
            <CardActions style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button size='md' data-link="https://github.com/EricCoisa/GraphQLAPI" onClick={OpenLinkTab}>
                <Icon icon="mdi:github" width={20} height={20} />
                {t("projects.repository")}
              </Button>
            </CardActions>
          </CardHeader>
          {t("projects.graphQLAPI.text")}
          <Line />
          <CardContent align='center'>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:language-csharp" width={16} height={16} />
              </IconCircle>
              <div>C#</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:graphql" width={16} height={16} />
              </IconCircle>
              <div>GraphQL</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:database" width={16} height={16} />
              </IconCircle>
              <div>EntityFramework</div>
            </Badge>
            <Badge>
              <IconCircle>
                <Icon icon="mdi:database" width={16} height={16} />
              </IconCircle>
              <div>SQL</div>
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
