export interface Expense {
  id: string;
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

export const CATEGORIES: string[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Health',
  'Other'
];