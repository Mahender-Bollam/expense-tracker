import React, { useState, useEffect } from 'react';
import { Expense, FormData, HoveredButton, HoveredExpense } from '../types/types';
import Header from './Header';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import styles from '../styles/ExpenseTracker.module.css';
import axios from "axios";

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
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

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/expenses', {
          headers: { 'Content-Type': 'application/json' },
        });
        const normalized = response.data.map((exp: Expense) => ({
          ...exp,
          date: new Date(exp.date).toISOString().split('T')[0],
        }));
        setExpenses(normalized);
      } catch {
        setExpenses([]);
      }
    };
    getAllExpenses();
  }, []);

 const postData = async () => {
  try {
    if (
      !formData.description.trim() ||
      !formData.amount ||
      !formData.category.trim() ||
      !formData.date
    ) {
      alert('All fields are required');
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      description: formData.description.trim(),
      amount: Number(formData.amount),
      category: formData.category.trim(),
      date: formData.date,
    };

    await axios.post('http://localhost:3000/expenses', newExpense);

    setExpenses(prev => [...prev, newExpense]);
    closeModal();
  } catch (error) {
    console.error(error);
  }
};


  const updateData = async () => {
    if (editingId === null) return;
    try {
      const updatedExpense: Expense = {
        id: editingId,
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
      };

      await axios.patch(`http://localhost:3000/expenses/${editingId}`, updatedExpense);

      setExpenses(prev =>
        prev.map(exp => (exp.id === editingId ? updatedExpense : exp))
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`);
      setExpenses(prev => prev.filter(exp => exp.id.toString() !== id.toString()));
    } catch (error) {
      console.error(error);
    }
  };

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
      amount: expense.amount?.toString() || '',
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      postData();
    } else {
      updateData();
    }
  };

  const totalExpense: number = expenses.length > 0
    ? expenses.reduce((sum, exp) => sum + Number(exp.amount) || 0, 0)
    : 0;

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
            onDelete={onDelete}
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
