import React from "react";
import { Edit2, Trash2, Tag, Calendar } from "lucide-react";
import { Expense } from "../interface/expense";

interface ExpenseListProps {
  expenses: Expense[];
  handleEdit: (expense: Expense) => void;
  handleDelete: (id: number) => void;
  hoveredButton: string | null;
  setHoveredButton: (btn: string | null) => void;
  hoveredExpense: number | null;
  setHoveredExpense: (id: number | null) => void;
  styles: any;
}
const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  handleEdit,
  handleDelete,
  hoveredButton,
  setHoveredButton,
  hoveredExpense,
  setHoveredExpense,
  styles,
}) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p style={styles.emptyState}>No expenses yet. Add your first expense above!</p>
      ) : (
        <div style={styles.expenseList}>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              style={{
                ...styles.expenseItem,
                ...(hoveredExpense === expense.id ? styles.expenseItemHover : {}),
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
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div style={styles.expenseRight}>
                <span style={styles.expenseAmount}>${expense.amount.toFixed(2)}</span>
                <div style={styles.actionButtons}>
                  <button
                    onClick={() => handleEdit(expense)}
                    style={{
                      ...styles.editButton,
                      ...(hoveredButton === `edit-${expense.id}` ? styles.editButtonHover : {}),
                    }}
                    onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    style={{
                      ...styles.deleteButton,
                      ...(hoveredButton === `delete-${expense.id}` ? styles.deleteButtonHover : {}),
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
          ))}
        </div>
      )}
    </div>
  );
};
export default ExpenseList;