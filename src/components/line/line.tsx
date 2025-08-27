import { LineStyled } from './line.styles';


interface LineProps {
  color?: string;
}

function Line({ color }: LineProps) {
  return <LineStyled color={color} />;
}

export default Line;
