import React, { useState, FormEvent } from 'react';
import { DollarSign, Plus, X } from 'lucide-react';
import { styles } from '../ExpenseTracker.styles';
import { Expense } from '../models/expense';
import { FormData } from '../models/formData';
import Modal from './Modal';
import ExpenseList from './ExpenseList';

const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

export const ExpenseTracker: React.FC = () => {
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
  const [hoveredExpense, setHoveredExpense] = useState<number | null>(null);

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
  const handleDelete = (id: number): void => {
    const confirmDelete = window.confirm('Are you sure want to delete this expense?');
    if (confirmDelete) {
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
      alert('Expense deleted successfully!');
    }
  };

  const handleAddClick = (): void => {
    setFormData({
      description: '',
      amount: '',
      category: categories[0] || '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const amountValue = parseFloat(formData.amount);

    if (!formData.description || isNaN(amountValue) || amountValue <= 0 || !formData.category || !formData.date) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newExpense = {
      description: formData.description,
      amount: amountValue,
      category: formData.category,
      date: formData.date,
    };

    if (editingId) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === editingId ? { ...newExpense, id: editingId } : exp))
      );
      alert('Expense updated successfully!');
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, { ...newExpense, id: Date.now() }]);
      alert('Expense added successfully!');
    }
    closeModal();
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign size={30} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>Track your spending easily.</p>
            </div>
            <button
              data-testid="add-expense-button"
              onClick={handleAddClick}
              style={styles.addButton}
              title="Add New Expense"
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Spent</p>
            <p style={styles.totalAmount} data-testid="total-amount">
              ₹{totalExpense.toFixed(2)}
            </p>
          </div>
        </div>

        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          hoveredExpense={hoveredExpense}
          setHoveredExpense={setHoveredExpense}
          data-testid="expense-list"
        />
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle} data-testid="modal-title">
              {editingId ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <button onClick={closeModal} style={styles.closeButton} data-testid="close-modal">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="description">Description</label>
              <input
                id="description"
                data-testid="description-input"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={styles.input}
                placeholder="Add Description"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="amount">Amount (₹)</label>
              <input
                id="amount"
                data-testid="amount-input"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                style={styles.input}
                step="0.01"
                min="0.01"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="category">Category</label>
              <select
                id="category"
                data-testid="category-input"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="date">Date</label>
              <input
                id="date"
                data-testid="date-input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.primaryButton} data-testid="submit-button">
                {editingId ? 'Save Changes' : 'Add Expense'}
              </button>
              <button type="button" onClick={closeModal} style={styles.secondaryButton} data-testid="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ExpenseTracker;