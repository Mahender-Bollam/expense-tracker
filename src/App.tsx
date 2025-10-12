import React, { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { styles } from './styles';
import { Expense, FormData } from './types/expense';
import { Modal } from './components/Modal/Modal';
import { ExpenseForm } from './components/ExpenseForm/ExpenseForm';
import { ExpenseList } from './components/ExpenseList/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ]);
  
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const navigateModel = (): void => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleExpense = (): void => {
    if (editingId !== null) {
      setExpenses((preExpense) =>
        preExpense.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                description: formData.description,
                amount: Number(formData.amount),
                date: formData.date,
                category: formData.category,
              }
            : expense
        )
      );
    } else {
      const expense: Expense = {
        id: expenses.length + 1,
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
      };
      setExpenses([...expenses, expense]);
    }
    closeModal();
  };

  const handleDelete = (id: number): void => {
    const exit = expenses.filter((current) => current.id !== id);
    setExpenses(exit);
  };

  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign color="#6366F1" size={32} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>Manage your daily expenses efficiently</p>
            </div>
            <button
              onClick={navigateModel}
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
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
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ExpenseForm
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleExpense}
          onCancel={closeModal}
          isEditing={editingId !== null}
        />
      </Modal>
    </div>
  );
}

export default App;