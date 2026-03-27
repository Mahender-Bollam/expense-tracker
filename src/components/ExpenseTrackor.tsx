import React, { useState } from 'react';
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag } from 'lucide-react';
import { styles } from './Styles';
import { HoveredButton,HoveredExpense } from '../types/Button';
import { Modal } from './Model';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}
export interface FormData {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ]);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);

  const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      id: expenses.length + 1,
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const updateExpense = () => {
  const { id, description, amount, category, date } = formData;
  if (amount <= 0) {
    alert("Amount should be greater than 0");
    return;
  }
  if (!description || !amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }
  setExpenses(prev =>
    prev.map(exp => (exp.id === id ? formData : exp))
  );
  alert("Expense updated successfully.");
  setIsModalOpen(false);
};



  const handleEdit = (expense: Expense): void => {
    setFormData({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const handleAddExpense = () => {
    setIsModalOpen(true);
  }

  const addexpense = () => {
  const { description, amount, category, date } = formData;

 if (amount <= 0) {
    alert("Amount should be greater than 0");
    return;
  }

  if (!description || !amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  setExpenses(prev => [...prev, { ...formData, id: expenses.length + 1 }]);
  alert("expense added successfully");
  setIsModalOpen(false);
};

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const removeExpense = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    let confirmOption = confirm("Are you sure , do you want remove this expense");
    if (confirmOption) {
    setExpenses(prevExpenses => prevExpenses.filter(item => item.id !== id));
    alert("Expense removed succesfully")
  } else {
    alert("Expense is not removed")
  }
  }

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign color="#6366f1" size={32} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>Manage your daily expenses efficiently</p>
            </div>
            <button
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={handleAddExpense}
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>

          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>${totalExpense.toFixed(2)}</p>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Recent Expenses</h2>

          {expenses.length === 0 ? (
            <p style={styles.emptyState}>No expenses yet. Add your first expense above!</p>
          ) : (
            <div style={styles.expenseList}>
              {expenses.map((expense: Expense) => (
                <div
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
                        onClick={() => handleEdit(expense)}
                        style={{
                          ...styles.editButton,
                          ...(hoveredButton === `edit-${expense.id}` ? styles.editButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Edit"
                        data-testid="edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        style={{
                          ...styles.deleteButton,
                          ...(hoveredButton === `delete-${expense.id}` ? styles.deleteButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`delete-${expense.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Delete"
                        data-testid='remove'
                        
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
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} editingId={editingId} closeModal={closeModal} setHoveredButton={setHoveredButton} setFormData={setFormData} hoveredButton={hoveredButton} formData={formData} categories={categories} updateExpense={updateExpense} addexpense={addexpense} />
    </div>
  );
};

export default ExpenseTracker;