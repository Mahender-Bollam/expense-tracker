import React from 'react';
import { Expense } from '../models/expense';
import { styles } from '../ExpenseTracker.styles';
import { Trash2, Edit2, Calendar, Tag } from 'lucide-react';
import { HoveredExpense } from '../models/hoveredButton';

export interface ExpenseItemProps {
  expense: Expense;
  hoveredExpense: HoveredExpense;
  setHoveredExpense: (id: HoveredExpense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  hoveredExpense,
  setHoveredExpense,
  onEdit,
  onDelete
}) => {
  return (
    <div
    data-testid={`expense-item-${expense.description}`}
      style={{
        ...styles.expenseItem,
        ...(hoveredExpense === expense.id ? styles.expenseItemHover : {})
      }}
      onMouseEnter={() => setHoveredExpense(expense.id)}
      onMouseLeave={() => setHoveredExpense(null)}
    >
      <div style={styles.expenseContent}>
        <div style={styles.expenseTitleRow}>
          <span style={styles.expenseTitle}>{expense.description}</span>
          <span style={styles.categoryBadge}><Tag size={12} /> {expense.category}</span>
        </div>
        <div style={styles.expenseDate}>
          <Calendar size={14} />
          {expense.date}
        </div>
      </div>
      <div style={styles.expenseRight}>
        <span style={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</span>
        <div style={styles.actionButtons}>
          <button aria-label="Edit"onClick={() => onEdit(expense)} style={styles.editButton} title="Edit">
            <Edit2 size={16} />
          </button>
          <button aria-label="Delete" onClick={() => onDelete(expense.id)} style={styles.deleteButton} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
