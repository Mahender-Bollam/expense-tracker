import React from 'react';
import { Trash2, Edit2, Calendar, Tag } from 'lucide-react';
import styles from '../styles/ExpenseItem.module.css';
import { Expense, HoveredButton } from '../types/types';

interface ExpenseItemProps {
  expense: Expense;
  isHovered: boolean;
  setHoveredExpense: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredButton: HoveredButton;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void; 
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  isHovered,
  setHoveredExpense,
  hoveredButton,
  setHoveredButton,
  onDelete,
  onEdit, 
}) => {
  return (
    <div
      className={`${styles.expenseItem} ${isHovered ? styles.expenseItemHover : ''}`}
      onMouseEnter={() => setHoveredExpense(expense.id)}
      onMouseLeave={() => setHoveredExpense(null)}
    >
      <div className={styles.expenseContent}>
        <div className={styles.expenseTitleRow}>
          <h3 className={styles.expenseTitle}>{expense.description}</h3>
          <span className={styles.categoryBadge}>
            <Tag size={12} />
            {expense.category}
          </span>
        </div>
        <div className={styles.expenseDate}>
          <Calendar size={14} />
          {new Date(expense.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      <div className={styles.expenseRight}>
        <span className={styles.expenseAmount}>${expense.amount}</span>
        <div className={styles.actionButtons}>
          
          <button
            className={`${styles.editButton} ${
              hoveredButton === `edit-${expense.id}` ? styles.editButtonHover : ''
            }`}
            onClick={() => onEdit(expense)} 
            onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
            onMouseLeave={() => setHoveredButton(null)}
            title="Edit"
          >
            <Edit2 size={18} />
          </button>

          <button
            className={`${styles.deleteButton} ${
              hoveredButton === `delete-${expense.id}` ? styles.deleteButtonHover : ''
            }`}
            onClick={() => onDelete(expense.id)}
            onMouseEnter={() => setHoveredButton(`delete-${expense.id}`)}
            onMouseLeave={() => setHoveredButton(null)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
