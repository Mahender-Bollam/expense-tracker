import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { styles } from '../../styles';
import { Expense } from '../../types/expense';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onEdit,
  onDelete
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.expenseItem,
        ...(isHovered ? styles.expenseItemHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <span style={styles.expenseAmount}>
          ${expense.amount.toFixed(2)}
        </span>
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
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};