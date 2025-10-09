
import React, { useState, FormEvent} from 'react';
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag, X } from 'lucide-react';
import  {styles} from './ExpenseTracker.styles';
import {Expense,FormData,ModalProps,HoveredButton,HoveredExpense} from './models/ExpenseTracker.types';
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={styles.overlay} onClick={onClose}>
     <div style={styles.modal} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const ExpenseTracker: React.FC = () => {
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
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };
  const handleDelete = (id: number): void => {
  const confirmDelete = window.confirm("Are you sure want to delete this expense?");
  if (confirmDelete) {
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id));
    alert("Expense deleted successfully!");
  }
};


  const handleAddClick = (): void => {
   
    setFormData({
      description: '',
      amount: '',
      category: categories[0] || '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setIsModalOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const amountValue = parseFloat(formData.amount);

    if (!formData.description || isNaN(amountValue) || amountValue <= 0 || !formData.category || !formData.date) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newExpense: Omit<Expense, 'id'> = {
      description: formData.description,
      amount: amountValue,
      category: formData.category,
      date: formData.date
    };
    if (editingId) { 
      setExpenses(prevExpenses =>
        prevExpenses.map(exp => (exp.id === editingId ? { ...newExpense, id: editingId } : exp))
      );
      alert(`Expense updated successfully!`);
    } 
    else {
      const expenseToAdd: Expense = { ...newExpense, id: Date.now() };
      setExpenses(prevExpenses => [...prevExpenses, expenseToAdd]);
      alert(`Expense added successfully!`);
    }
    closeModal();
  };
  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

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
              onClick={handleAddClick}
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
              title="Add New Expense"
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Spent</p>
            <p style={styles.totalAmount}>₹{totalExpense.toFixed(2)}</p>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Expense History</h2>
          {expenses.length === 0 ? (
            <p style={styles.emptyState}>No expenses recorded yet. Add one!</p>
          ) : (
            <div style={styles.expenseList}>
              {expenses.map((expense) => (
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
                      <span style={styles.expenseTitle}>{expense.description}</span>
                      <span style={styles.categoryBadge}><Tag size={12} /> {expense.category}</span>
                    </div>
                    <div style={styles.expenseDate}>
                      <Calendar size={14} />
                      {expense.date}
                    </div>
                  </div>
                  <div style={styles.expenseRight}>
                    <span style={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</span>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(expense)}
                        style={styles.editButton}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        style={styles.deleteButton}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{editingId ? 'Edit Expense' : 'Add New Expense'}</h3>
          <button onClick={closeModal} style={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <input
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
            <label style={styles.label}>Amount (₹)</label>
            <input
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
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>
              {editingId ? 'Save Changes' : 'Add Expense'}
            </button>
            <button type="button" onClick={closeModal} style={styles.secondaryButton}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;