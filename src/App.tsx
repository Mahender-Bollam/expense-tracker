import React, { useState, CSSProperties, useEffect } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { Expense, FormData, HoveredButton, HoveredExpense } from './types/types';
import { validateForm } from './utils/utils';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseItem from './components/ExpenseItem/ExpenseItem';
import { Modal } from './components/Modal/Modal';
import { createExpense, deleteExpense, getExpenses, updateExpense } from './api/expense';
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
  }
};

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Partial<FormData>>({})

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
    setErrors({})
  };

  const getData = async () => {
    const data = await getExpenses();
    setExpenses(data)
  }

  useEffect(() => {
    getData();
  }, [])

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

  useEffect(() => {
    const hasData = Object.keys(formData).some((key) => key !== 'date' && formData[key as keyof FormData]);
    if (hasData) {
      setErrors(validateForm(formData))
      return
    }
  }, [formData])

  const onSubmit = async () => {
    const errors = validateForm(formData)
    setErrors(errors)
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (!editingId) {
      try {
        const data = await createExpense({ ...formData, amount: Number(formData.amount) })
        setExpenses([...expenses, data])
      } catch {
        alert('unable to create expense');
      }
      closeModal()
      return;
    }
    const updateExpences = expenses.map((item) => {
      if (item.id === editingId) {
        return {
          ...item,
          ...formData,
          amount: Number(formData.amount)
        }
      }
      return item
    })
    try {
      await updateExpense(editingId, { ...formData, amount: Number(formData.amount) })
      setExpenses(updateExpences);
      closeModal();
    } catch {
      alert('unable to update expense')
    }
  }

  const handleDelete = async () => {
    if (!hoveredExpense) return;
    const updatedExpenses = expenses.filter((item) => {
      return item.id !== hoveredExpense
    })
    try {
      await deleteExpense(hoveredExpense)
      setExpenses(updatedExpenses)
    } catch {
      alert('unable to delete expense')
    }
  }

  const handleAdd = () => {
    setIsModalOpen(true);
  }

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

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
              data-testid='add-expense'
              onClick={handleAdd}
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

          {expenses.length === 0 ? (
            <p style={styles.emptyState}>No expenses yet. Add your first expense above!</p>
          ) : (
            <div style={styles.expenseList}>
              {expenses.map((expense: Expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  hoveredExpense={hoveredExpense}
                  hoveredButton={hoveredButton}
                  setHoveredExpense={setHoveredExpense}
                  setHoveredButton={setHoveredButton}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ExpenseForm
          formData={formData}
          errors={errors}
          editingId={editingId}
          categories={categories}
          hoveredButton={hoveredButton}
          setFormData={setFormData}
          setHoveredButton={setHoveredButton}
          onSubmit={onSubmit}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default ExpenseTracker;