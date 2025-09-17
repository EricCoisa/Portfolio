import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { DropdownContainer, DropdownList, DropdownItem, DropdownOverlay } from './dropdownMenu.styles';
import Button from '../button/button';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

export type DropdownItemType = {
  label: string;
  action: (() => void) | ReactNode;
};

type DropdownItemProps = {
  item: DropdownItemType;
  onSelect: (item: DropdownItemType) => void;
};

function DropdownItemComponent({ item, onSelect }: DropdownItemProps) {
  const isComponent = typeof item.action !== 'function';

  function handleClick() {
    if (!isComponent) {
      onSelect(item);
    }
  }
  return (
    <DropdownItem onClick={handleClick}>
      {item.label}
      {isComponent ? item.action as ReactNode : null}
    </DropdownItem>
  );
}

export interface DropdownMenuProps {
  items: DropdownItemType[];
  trigger?: (toggle: () => void, open: boolean) => ReactNode;
}

function DropdownMenu({ items, trigger }: DropdownMenuProps) {
    const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [alignRight, setAlignRight] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const theme = useTheme();
  function handleToggle() {
    setOpen(function toggleOpen(prevOpen) {
      return !prevOpen;
    });
  }
  
  function handleItemClick(item: DropdownItemType) {
    if (typeof item.action === 'function') {
      item.action();
      setOpen(false);
    }
  }

  useEffect(function handleDropdownPosition() {
    if (open && containerRef.current && listRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Verifica se o dropdown ultrapassa a borda direita
      const wouldOverflow = containerRect.left + listRect.width > viewportWidth - 20;
      setAlignRight(wouldOverflow);
    }
  }, [open, theme, t ]);


  return (
    <DropdownContainer ref={containerRef}>
      {typeof trigger === 'function'
        ? trigger(handleToggle, open)
        : (
            <Button onClick={handleToggle} aria-haspopup="true" aria-expanded={open}>
              <Button.Icon iconName="mdi:menu" />
            </Button>
          )}
      {open && (
        <>
          <DropdownOverlay onClick={() => setOpen(false)} />
          <DropdownList ref={listRef} style={{ right: alignRight ? 0 : 'auto', left: alignRight ? 'auto' : 0 }}>
            {items.map(function renderDropdownItem(item) {
              return (
                <DropdownItemComponent
                  key={item.label}
                  item={item}
                  onSelect={handleItemClick}
                />
              );
            })}
          </DropdownList>
        </>
      )}
    </DropdownContainer>
  );
}

export default DropdownMenu;