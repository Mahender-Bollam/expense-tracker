import React from 'react';
import { styles } from '../../styles';
import { Expense } from '../../types/expense';
import { ExpenseItem } from '../ExpenseItem/ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete
}) => {
  if (expenses.length === 0) {
    return (
      <p style={styles.emptyState}>
        No expenses yet. Add your first expense above!
      </p>
    );
  }

  return (
    <div style={styles.expenseList}>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};