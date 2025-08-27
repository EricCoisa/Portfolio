import React from 'react';
import { OptionButton, OptionsContainer } from './options.styles';


export type OptionType = string | { label: string; value: string };

export interface OptionsProps {
  options: OptionType[];
  onSelect?: (value: string) => void;
  selected?: string;
  className?: string;
}

function Options({ options, onSelect, selected, className }: OptionsProps) {
  function handleSelect(value: string) {
    if (onSelect) onSelect(value);
  }

  function getClickHandler(value: string) {
    return function selectHandler() {
     return handleSelect(value);
    };
  }

  return (
    <OptionsContainer className={className}>
      {options.map((opt) => {
        const label = typeof opt === 'string' ? opt : opt.label;
        const value = typeof opt === 'string' ? opt : opt.value;
        return (
          <OptionButton
            key={value}
            $selected={selected === value}
            onClick={getClickHandler(value)}
          >
            {label}
          </OptionButton>
        );
      })}
    </OptionsContainer>
  );
}

export default Options;
