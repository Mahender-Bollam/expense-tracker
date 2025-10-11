import { HoveredButton } from "../App";
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface FormData {
  id: number | string;
  description: string;
  amount: string |number;
  category: string;
  date: string ;
}


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type HandleButtonProps = {
    isModalOpen:Boolean;
    closeModal:ModalProps;
    editingId:number | null;
    formData:FormData;
    setFormData:Function;
    setHoveredButton:Function;
    hoveredButton:HoveredButton;
    handleEditSubmit:Function
    handleSubmit:Function;
    ModalProps:object;
}