import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Card from './Card';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogCard = styled(Card)`
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <DialogCard>
        <h2>{title}</h2>
        <p style={{ marginTop: '1rem' }}>{message}</p>
        <ButtonGroup>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={isLoading} style={{ backgroundColor: 'red' }}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </ButtonGroup>
      </DialogCard>
    </Overlay>
  );
};

export default ConfirmDialog;
