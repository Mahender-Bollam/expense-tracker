import React from 'react'
import { Expense } from '../types/expenseType'
import { styles } from '../styles/Styles'
import { Calendar, Edit2, Tag, Trash2 } from 'lucide-react'
import { expenseCardProp } from '../types/propTypes'


const ExpenseCard = ({ expenses, hoveredButton, setHoveredButton, hoveredExpense, setHoveredExpense, setFormData, setEditingId, setIsModalOpen, setExpenses }: expenseCardProp) => {

  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: Number(expense.amount.toString()),
      category: expense.category,
      date: expense.date,
      id: expenses.length + 1
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const handleDelete = (expenseId: number) => {
    alert('Are you sure to delete the Expense!')
    setExpenses(updateExpense => updateExpense.filter(expense => expense.id !== expenseId))
  }
  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Recent Expenses</h2>

      {expenses.length === 0 ? (
        <p style={styles.emptyState}>No expenses yet. Add your first expense above!</p>
      ) : (
        <div style={styles.expenseList}>
          {expenses.map((expense: Expense) => (
            <div
            data-testid='expense-block-hover'
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
                <span style={styles.expenseAmount}>
                  ${expense.amount.toFixed(2)}
                </span>
                <div style={styles.actionButtons}>
                  <button
                  data-testid='edit-button-hover'
                    onClick={() => handleEdit(expense)}
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
                    onClick={() => handleDelete(expense.id)}
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
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseCard