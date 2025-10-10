import React from 'react';
import { ModalProps } from '../types/expenseData';  



const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={onClose}
          className='closeButton'
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
