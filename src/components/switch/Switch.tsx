import { SwitchContainer, SwitchButton, SwitchLabel } from './Switch.styles';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function Switch({ checked, onChange, label }: SwitchProps) {
  function handleToggle() {
    onChange(!checked);
  }

  return (
    <SwitchContainer>
      <SwitchButton checked={checked} onClick={handleToggle}>
        <span />
      </SwitchButton>
      {label && <SwitchLabel>{label}</SwitchLabel>}
    </SwitchContainer>
  );
}

export default Switch;
