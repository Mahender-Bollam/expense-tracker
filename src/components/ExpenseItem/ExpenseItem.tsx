import React, { CSSProperties } from 'react';
import { Edit2, Trash2, Tag, Calendar } from 'lucide-react';
import { Expense, HoveredButton } from '../../types/types';

interface ExpenseItemProps {
  expense: Expense;
  hoveredExpense: number | null;
  hoveredButton: HoveredButton;
  setHoveredExpense: (id: number | null) => void;
  setHoveredButton: (button: HoveredButton) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const styles: Record<string, CSSProperties> = {
  expenseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  },
  expenseItemHover: {
    backgroundColor: '#f3f4f6'
  },
  expenseContent: {
    flex: 1
  },
  expenseTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  expenseTitle: {
    fontWeight: '600',
    color: '#1f2937'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  expenseDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: '#6b7280'
  },
  expenseRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  expenseAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '8px',
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  editButtonHover: {
    backgroundColor: '#dbeafe'
  },
  deleteButton: {
    padding: '8px',
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  deleteButtonHover: {
    backgroundColor: '#fee2e2'
  }
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  hoveredExpense,
  hoveredButton,
  setHoveredExpense,
  setHoveredButton,
  onEdit,
  onDelete
}) => {
  return (
    <div
      data-testid="expense-row"
      key={expense.id}
      style={{
        ...styles.expenseItem,
        ...(hoveredExpense === expense.id ? styles.expenseItemHover : {})
      }}
      onMouseEnter={() => setHoveredExpense(expense.id)}
      onMouseLeave={() => setHoveredExpense(null)}
    >
      <div style={styles.expenseContent}>
        <div style={styles.expenseTitleRow}>
          <h3 style={styles.expenseTitle}>{expense.description}</h3>
          <span style={styles.categoryBadge}>
            <Tag size={12} />
            {expense.category}
          </span>
        </div>
        <div style={styles.expenseDate}>
          <Calendar size={14} />
          {new Date(expense.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>

      <div style={styles.expenseRight}>
        <span style={styles.expenseAmount}>${parseFloat(expense.amount).toFixed(2)}</span>
        <div style={styles.actionButtons}>
          <button
            onClick={() => onEdit(expense)}
            style={{
              ...styles.editButton,
              ...(hoveredButton === `edit-${expense.id}` ? styles.editButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
            onMouseLeave={() => setHoveredButton(null)}
            title="Edit"
            data-testid="expense-edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            style={{
              ...styles.deleteButton,
              ...(hoveredButton === `delete-${expense.id}` ? styles.deleteButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton(`delete-${expense.id}`)}
            onMouseLeave={() => setHoveredButton(null)}
            title="Delete"
            data-testid="expense-delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
