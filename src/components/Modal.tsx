import React from "react";
import {ModalProps} from '../models/modalProps';
import  {styles} from '../ExpenseTracker.styles';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div data-testid="modal-overlay"style={styles.overlay} onClick={onClose}>
     <div style={styles.modal} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;