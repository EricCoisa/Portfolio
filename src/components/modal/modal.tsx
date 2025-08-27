import React from 'react';
import { ModalOverlay, ModalContainer, ModalContent, ModalHeader, ModalClose } from './modal.styles';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xg' | 'full';
}

function Modal(props : ModalProps) {
  const { t } = useTranslation();
  const { isOpen, onClose, title, children, showClose, size = 'md' } = props;

  // Fecha ao pressionar ESC
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Desabilita o scroll do body enquanto o modal está aberto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleOverlayClick() {
    onClose();
  }

  function handleContainerClick(e: React.MouseEvent) {
    e.stopPropagation();
  }
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer size={size} onClick={handleContainerClick}>
        {(title || showClose) && (
          <ModalHeader>
            {title && <span>{title}</span>}
            {showClose && (
              <ModalClose onClick={onClose} aria-label={t('modal.close')}>×</ModalClose>
            )}
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
