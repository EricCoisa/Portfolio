import { useTranslation } from 'react-i18next';
import { SkillBannerContainer, Title, SkillBannerItem, ViewBannerContainer } from './skills.styles';

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
import Banner from '../../components/banner/banner';

const connector = connectUtil(
  (state: RootStateBase) => ({
    currentView: state.ApplicationReducer.currentView,
  }),
  { SetCurrentView }
);

export type SkillsProps = PropsFromRedux<typeof connector>;

function Skills(_props: SkillsProps) {
  const { t } = useTranslation();
  const iconWidth = 32;
  const iconHeight = 32;
  return (
    <ViewContainer icon='mdi:school-outline' style={{display:"unset",  padding: '0', }} name={t('navigation.skills')} color='rgba(10, 0, 146, 0.2)' background='rgba(255, 47, 238, 0.18)'>
      <SkillBannerContainer>
        <Banner items={[
          <SkillBannerItem><Icon icon="mdi:react" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="simple-icons:styledcomponents" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="akar-icons:redux-fill" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="devicon-plain:dotnetcore" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="teenyicons:c-sharp-outline" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="mdi:docker" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="mdi:api" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
          <SkillBannerItem><Icon icon="mdi:server" width={iconWidth} height={iconHeight} /></SkillBannerItem>,
        ]} />
      </SkillBannerContainer>
      <ViewBannerContainer {..._props}>

        <Title>{t('skills.title')}</Title>
        <CardContainer align="center" mode="grid" maxHorizontal={3}>

          {/* React */}
          <Card>
            <CardHeader>
              <Icon icon="mdi:react" width={32} height={32} />
              <CardTitle>{t("skills.react.title")}</CardTitle>
            </CardHeader>
            {t("skills.react.text")}
            <Line />
            <CardContent align='center'>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="lineicons:vite" width={16} height={16} />
                </IconCircle>
                <div>Vite</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="simple-icons:lerna" width={16} height={16} />
                </IconCircle>
                <div>Lerna</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="akar-icons:redux-fill" width={16} height={16} />
                </IconCircle>
                <div>Redux</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="simple-icons:storybook" width={16} height={16} />
                </IconCircle>
                <div>Storybook</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="simple-icons:styledcomponents" width={16} height={16} />
                </IconCircle>
                <div>Styled-Components</div>
              </Badge>
            </CardContent>
          </Card>

          {/* React Native */}
          <Card>
            <CardHeader>
              <Icon icon="mdi:react" width={32} height={32} />
              <CardTitle>{t("skills.reactNative.title")}</CardTitle>
            </CardHeader>
            {t("skills.reactNative.text")}
            <Line />
            <CardContent align="center">
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="simple-icons:expo" width={16} height={16} />
                </IconCircle>
                <div>Expo</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="material-symbols:android" width={16} height={16} />
                </IconCircle>
                <div>Android Studio</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="material-symbols:ios" width={16} height={16} />
                </IconCircle>
                <div>iOS</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="mdi:firebase" width={16} height={16} />
                </IconCircle>
                <div>Firebase</div>
              </Badge>
              <Badge size="sm">
                <IconCircle>
                  <Icon icon="mingcute:notification-fill" width={16} height={16} />
                </IconCircle>
                <div>Notifee</div>
              </Badge>
            </CardContent>
          </Card>

          {/* Backend / API */}
          <Card>
            <CardHeader>
              <Icon icon="mdi:api" width={32} height={32} />
              <CardTitle>{t("skills.apis.title")}</CardTitle>
            </CardHeader>
            {t("skills.apis.text")}
            <Line />
            <CardContent align="center">
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
                  <Icon icon="simple-icons:dapper" width={16} height={16} />
                </IconCircle>
                <div>Dapper</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:cloud" width={16} height={16} />
                </IconCircle>
                <div>Azure</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:database" width={16} height={16} />
                </IconCircle>
                <div>Entity Framework</div>
              </Badge>
            </CardContent>
          </Card>

          {/* Infra & DevOps */}
          <Card>
            <CardHeader>
              <Icon icon="mdi:tools" width={32} height={32} />
              <CardTitle>{t("skills.devops.title")}</CardTitle>
            </CardHeader>
            {t("skills.devops.text")}
            <Line />
            <CardContent align="center">
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:github" width={16} height={16} />
                </IconCircle>
                <div>GitHub Actions</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:docker" width={16} height={16} />
                </IconCircle>
                <div>Docker</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:microsoft-azure" width={16} height={16} />
                </IconCircle>
                <div>Azure</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:cloud-outline" width={16} height={16} />
                </IconCircle>
                <div>CI/CD</div>
              </Badge>
              <Badge>
                <IconCircle>
                  <Icon icon="mdi:git" width={16} height={16} />
                </IconCircle>
                <div>Git</div>
              </Badge>
            </CardContent>
          </Card>

        </CardContainer>
      </ViewBannerContainer>

    </ViewContainer>
  );
}

const ConnectedSkills = connector(Skills);
export default ConnectedSkills;
