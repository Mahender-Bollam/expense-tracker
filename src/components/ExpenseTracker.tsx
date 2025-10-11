import React, { useState } from 'react';
import { Expense, FormData, HoveredButton, HoveredExpense } from '../types/types';
import Header from './Header';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import styles from '../styles/ExpenseTracker.module.css';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 85.5, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.0, category: 'Transport', date: '2025-10-06' },
  ]);
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
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
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleAdd = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddExpense = () => {
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill all fields');
    } else {
      const ex: Expense = {
        id: expenses.length + 1,
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
      };
      setExpenses([...expenses, ex]);
      closeModal();
      alert('Added successfully');
    }
  };

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <div className={styles.card}>
          <Header
            onAddClick={handleAdd}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
          />
          <TotalCard total={totalExpense} />
        </div>

        <div className={styles.card}>
          <ExpenseList
            expenses={expenses}
            hoveredExpense={hoveredExpense}
            setHoveredExpense={setHoveredExpense}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
          />
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        onSubmit={handleAddExpense}
        hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton}
        editingId={editingId}
      />
    </div>
  );
};

export default ExpenseTracker;
