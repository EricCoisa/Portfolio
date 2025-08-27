import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { isLowPerformance } from '../../utils/applicationUtil';
import styled from 'styled-components';
import type { RootStateBase } from '../../store/rootReducer';

const Wrapper = styled.div<{opacity?: number}>`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: ${({ theme }) => (theme.blur === 'none' ? 0.18 : 0.35)};
`;

const connector = connectUtil(
  (state: RootStateBase) => ({
     isLowPerformance: state.ApplicationReducer.isLowPerformance,
     currentView: state.ApplicationReducer.currentView,
     views: state.ApplicationReducer.views,
  }),
  {  }
);

export type GlassNoiseProps = PropsFromRedux<typeof connector>;

function GlassNoise(props : GlassNoiseProps) {
  if(props.isLowPerformance){ return null;}
  if (isLowPerformance()){ return null;}

  return (
    <Wrapper aria-hidden>
      <svg width="100%" height="100%">
        <filter id="liquidNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" />
          <feColorMatrix type="saturate" values="1.4" />
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
        <rect width="100%" height="100%" filter="url(#liquidNoise)" />
      </svg>
  </Wrapper>
  );
}

const ConnectedGlassNoise = connector(GlassNoise);
export default ConnectedGlassNoise;

