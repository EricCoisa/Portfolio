import styled from 'wrapper-styled-components';
import { ColorContainer } from '../colorContainer/colorContainer';

export const ViewContainer = styled(ColorContainer).attrs({ as: "div" })`
  ${styled.themeLayer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 80px clamp(1rem, 4vw, 2rem) 2rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  border-radius: 20px;
  @media (max-width: 768px) {
    padding: 76px 1rem 2rem;
    min-height: calc(100vh - 56px);
  }

  @media (max-width: 480px) {
    padding: 72px 1rem 1rem;
  }
`;