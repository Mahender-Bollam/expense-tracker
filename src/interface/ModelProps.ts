import { MouseEventHandler } from "react";
import { FormData } from "./FormData";


export interface ModalProps {
  isOpen: boolean;
  onClose: ()=>void;
  children: React.ReactNode;
}

export interface ModelCardProps{
    isModalOpen:boolean,
    closeModal:()=>void,
    formData:FormData,
    setFormData:Function,
    hoveredButton:HoveredButton,
    setHoveredButton:Function,
    editingId:number|null,
    handleClick:MouseEventHandler<HTMLButtonElement>
}

export type HoveredButton = string | null;
export type HoveredExpense = number | null;
