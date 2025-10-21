import React from 'react';
import ExpenseItem from './ExpenseItem';
import styles from '../styles/ExpenseList.module.css';
import { Expense, HoveredButton, HoveredExpense } from '../types/types';

interface ExpenseListProps {
  expenses: Expense[];
  hoveredExpense: HoveredExpense;
  setHoveredExpense: React.Dispatch<React.SetStateAction<HoveredExpense>>;
  hoveredButton: HoveredButton;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void; 
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  hoveredExpense,
  setHoveredExpense,
  hoveredButton,
  setHoveredButton,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p className={styles.emptyState}>No expenses yet. Add your first expense above!</p>
      ) : (
        <div className={styles.expenseList}>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              isHovered={hoveredExpense === expense.id}
              setHoveredExpense={setHoveredExpense}
              hoveredButton={hoveredButton}
              setHoveredButton={setHoveredButton}
              onDelete={onDelete}
              onEdit={onEdit} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ExpenseList;
