import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { isLowPerformance } from '../../utils/applicationUtil';
import { Background } from './background.styles';
import type { RootStateBase } from 'src/store/rootReducer';


const connector = connectUtil(
  (state: RootStateBase) => ({
     isLowPerformance: state.ApplicationReducer.isLowPerformance,
     currentView: state.ApplicationReducer.currentView,
     views: state.ApplicationReducer.views,
  }),
  {  }
);

export type BackgroundComponentProps = PropsFromRedux<typeof connector>;

function BackgroundComponent(props: BackgroundComponentProps) {
  if(props.isLowPerformance){ return null;}
  if (isLowPerformance()){ return null;}
  const currentViewProp = props.views.find(view => view.name === props.currentView?.name);

  return <Background aria-hidden viewColor={currentViewProp?.color} viewBg={currentViewProp?.background} />;
}

const ConnectedBackground = connector(BackgroundComponent);
export default ConnectedBackground;
