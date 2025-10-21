export interface Expense {
  id: number;
  description: string;
  amount: string;
  category: string;
  date: string;
}

export interface FormData {
  description: string;
  amount: string;
  category: string;
  date: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type HoveredButton = string | null;
export type HoveredExpense = number | null;