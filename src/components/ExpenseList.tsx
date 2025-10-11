import React from 'react';
import { Expense } from '../models/expense';
import ExpenseItem from './ExpenseItem';
import { styles } from '../ExpenseTracker.styles';
import { HoveredExpense } from '../models/hoveredButton';

export interface ExpenseListProps {
  expenses: Expense[];
  hoveredExpense: HoveredExpense;
  setHoveredExpense: (id: HoveredExpense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  hoveredExpense,
  setHoveredExpense,
  onEdit,
  onDelete
}) => {
  return (
    <div style={styles.expenseList}>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id} data-testid={`expense-item-${expense.description}`}
          expense={expense}
          hoveredExpense={hoveredExpense}
          setHoveredExpense={setHoveredExpense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
