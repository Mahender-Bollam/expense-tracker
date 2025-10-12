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

export type HoveredButton = string | null;
export type HoveredExpense = number | null;