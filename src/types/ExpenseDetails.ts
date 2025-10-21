import { HoveredButton } from "../App";
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface FormData {
  id: number;
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
    isModalOpen:boolean;
    closeModal:()=>void
    editingId:number | null;
    formData:FormData;
    setFormData:Function;
    setHoveredButton:Function;
    hoveredButton:HoveredButton;
    expenses: Expense[]
    setExpenses:Function;
    setIsModalOpen:Function;
}