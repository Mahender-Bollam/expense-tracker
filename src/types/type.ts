


export interface Expense {
  id: number;
  description: string;
  amount: number;
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

export interface OpenOrCloseModelBtn {
  title: string;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModel ?: ()=>void;
}

export interface OpenOrDeleteExpenseBtn  {
  manageExpense:(expense: Expense) => void;
  expense: Expense;
  title: string
}

export interface EditOrAddExpenseBtn {
  editingId: number | null;
  editExpense: (expenseId: number) => void;
  addExpense: () => void
}