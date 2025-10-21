import React, { useState, useEffect } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { styles } from './styles';
import { Expense, FormData } from './types/expense';
import { Modal } from './components/Modal/Modal';
import { ExpenseForm } from './components/ExpenseForm/ExpenseForm';
import { ExpenseList } from './components/ExpenseList/ExpenseList';
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from './services/expenseApi';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses();
        const formatted = data.map((exp: any) => ({
          id: exp.id,
          description: exp.title,
          amount: exp.amount,
          category: exp.category,
          date: exp.date
        }));
        setExpenses(formatted);
      } 
      catch (err) {}
    };
    fetchExpenses();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const openModal = () => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleExpense = async () => {
    try {
      if (editingId) {
        const updated = await updateExpense(editingId, {
          title: formData.description,
          amount: Number(formData.amount),
          category: formData.category,
          date: formData.date
        });

        setExpenses(prev =>
          prev.map(exp => (exp.id === editingId ? {
            ...exp,
            description: updated.title ?? exp.description,
            amount: updated.amount ?? exp.amount,
            category: updated.category ?? exp.category,
            date: updated.date ?? exp.date
          } : exp))
        );
      } 
      else {
        const newExp = await createExpense({
          title: formData.description,
          amount: Number(formData.amount),
          category: formData.category,
          date: formData.date
        });

        setExpenses(prev => [
          ...prev,
          {
            id: newExp.id,
            description: newExp.title || formData.description,
            amount: newExp.amount ?? Number(formData.amount),
            category: newExp.category ?? formData.category,
            date: newExp.date ?? formData.date
          }
        ]);
      }

      closeModal();
    } 
    catch (err) {
      alert("Error saving expense — check console for details");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    } 
    catch (err) {}
  };

  const handleEdit = (expense: Expense) => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

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
              onClick={openModal}
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
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
