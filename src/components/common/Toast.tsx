import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div<{ $type: ToastType; $isVisible: boolean }>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background-color: white;
  border-left: 6px solid;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  min-width: 300px;
  max-width: 450px;
  transition: all 0.3s ease-in-out;
  
  ${({ $isVisible }) =>
    $isVisible
      ? css`
          animation: ${slideIn} 0.3s ease-out forwards;
          visibility: visible;
        `
      : css`
          opacity: 0;
          transform: translateX(100%);
          visibility: hidden;
        `}

  border-color: ${({ $type, theme }) => {
    switch ($type) {
      case 'success':
        return '#10B981'; // Emerald 500
      case 'error':
        return '#EF4444'; // Red 500
      case 'info':
      default:
        return theme.colors.primary;
    }
  }};
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <ToastContainer $type={type} $isVisible={isVisible}>
      <Message>{message}</Message>
      <CloseButton onClick={onClose} aria-label="Close">
        &times;
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;
