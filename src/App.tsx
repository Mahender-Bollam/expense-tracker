
import React, { useState, CSSProperties, FormEvent } from 'react';
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag, X } from 'lucide-react';
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface FormData {
  description: string;
  amount: string; 
  category: string;
  date: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

type HoveredButton = string | null;
type HoveredExpense = number | null;


const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
    padding: '24px'
  },
  maxWidth: {
    maxWidth: '896px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '32px',
    marginBottom: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  subtitle: {
    color: '#6b7280'
  },
  addButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    fontSize: '14px'
  },
  addButtonHover: {
    backgroundColor: '#4f46e5'
  },
  totalCard: {
    background: 'linear-gradient(to right, #6366f1, #9333ea)',
    borderRadius: '12px',
    padding: '24px',
    color: 'white'
  },
  totalLabel: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '4px'
  },
  totalAmount: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px'
  },
  emptyState: {
    color: '#6b7280',
    textAlign: 'center',
    padding: '32px 0'
  },
  expenseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  expenseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  },
  expenseItemHover: {
    backgroundColor: '#f3f4f6'
  },
  expenseContent: {
    flex: 1
  },
  expenseTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  expenseTitle: {
    fontWeight: '600',
    color: '#1f2937'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  expenseDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: '#6b7280'
  },
  expenseRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  expenseAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '8px',
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  editButtonHover: {
    backgroundColor: '#dbeafe'
  },
  deleteButton: {
    padding: '8px',
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  deleteButtonHover: {
    backgroundColor: '#fee2e2'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  closeButton: {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'background-color 0.2s'
  },
  closeButtonHover: {
    backgroundColor: '#f3f4f6'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  primaryButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  primaryButtonHover: {
    backgroundColor: '#4f46e5'
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  secondaryButtonHover: {
    backgroundColor: '#f9fafb'
  }
};
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
    } else {
     
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