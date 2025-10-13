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

  const handleAdd = () => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

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

  const handleDelete = (id: number) => {
    const filteredExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(filteredExpenses);
    alert('Deleted Successfully');
  };

  const handleAddExpense = () => {
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    const newExpense: Expense = {
      id: expenses.length ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    };
    setExpenses([...expenses, newExpense]);
    closeModal();
    alert('Added successfully');
  };

 
  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    setExpenses((prevExpenses) =>
      prevExpenses.map((exp) =>
        exp.id === editingId
          ? {
              ...exp,
              description: formData.description,
              amount: parseFloat(formData.amount),
              category: formData.category,
              date: formData.date,
            }
          : exp
      )
    );
    alert('Updated Successfully');
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      handleAddExpense();
    } else {
      handleUpdateExpense(e);
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
            onDelete={handleDelete}
            onEdit={handleEdit} 
          />
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        onSubmit={handleSubmit}
        hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton}
        editingId={editingId}
      />
    </div>
  );
};

export default ExpenseTracker;
