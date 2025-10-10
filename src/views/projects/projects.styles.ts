import styled from 'wrapper-styled-components';
import Button from '../../components/button/button';

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 7vw, 2rem);
    margin-bottom: 1rem;
  }
`;

const ButtonProject = styled(Button).attrs({ size: 'sm' })`
  
`;

export { Title, ButtonProject };
