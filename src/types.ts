export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string; // ISO date string
  category?: string;
  notes?: string;
};