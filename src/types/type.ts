
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
  addExpense: ()=>void
}

export interface ExpenseCrd {
  expense: Expense;
  handleEdit: (expense: Expense) => void;
  deleteExpense:  (expenseToDelete: Expense) => void
}

export interface RecentExpensesCard {
  expenses: Expense[];
  handleEdit: (expense: Expense) => void;
  deleteExpense:  (expenseToDelete: Expense) => void
}

export interface HeaderCrd {
  expenses: Expense[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChildOfModalCompnt extends EditOrAddExpenseBtn {
  closeModal: ()=>void
}
export type ValidateExpenseParam = [
  newExpense : FormData,
  expenses : Expense[],
  editingId : number | null
]

export type ShareFormDataType = {
  dataOfForm: FormData,
  setDataOfForm: React.Dispatch<React.SetStateAction<FormData>>
}
