import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Trash2, Edit2, Calendar, Tag } from 'lucide-react';
import ExpenseForm from './ExpenseForm';
import { Expense, FormData, HoveredButton, HoveredExpense } from '../types/interface';
import '../styles/Styles.css';
import { fetchAllExpenses, createExpense, modifyExpense, removeExpense } from './api';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
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

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await fetchAllExpenses();
        setExpenses(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch expenses");
      }
    };
    fetchExpenses();
  }, []);

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

  const handleAddExpense = (): void => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await modifyExpense(editingId, {
          description: formData.description,
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: formData.date
        });
        setExpenses(prev => prev.map(exp => exp.id === editingId ? updated : exp));
        alert("Expense updated successfully!");
      } else {
        const newExp = await createExpense({
          description: formData.description,
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: formData.date
        });
        setExpenses(prev => [...prev, newExp]);
        alert("Expense added successfully!");
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save expense");
    }
  };

  const handleRemoveExpense = async (expenseRemove: Expense) => {
    try {
      await removeExpense(expenseRemove.id);
      setExpenses(prev => prev.filter(exp => exp.id !== expenseRemove.id));
      alert("Expense deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="container">
      <div className="maxWidth">
        <div className="card">
          <div className="header">
            <div className="titleWrapper">
              <h1 className="title">
                <DollarSign color="#6366f1" size={32} />
                Expense Tracker
              </h1>
              <p className="subtitle">Manage your daily expenses efficiently</p>
            </div>
            <button
              data-testid="open-modal"
              onClick={handleAddExpense}
              className={`addButton ${hoveredButton === 'add' ? 'addButtonHover' : ''}`}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
          <div className="totalCard">
            <p className="totalLabel">Total Expenses</p>
            <p className="totalAmount">${totalExpense.toFixed(2)}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Recent Expenses</h2>
          {expenses.length === 0 ? (
            <p className="emptyState">No expenses yet. Add your first expense above!</p>
          ) : (
            <div className="expenseList">
              {expenses.map(expense => (
                <div
                  key={expense.id}
                  className={`expenseItem ${hoveredExpense === expense.id ? 'expenseItemHover' : ''}`}
                  onMouseEnter={() => setHoveredExpense(expense.id)}
                  onMouseLeave={() => setHoveredExpense(null)}
                >
                  <div className="expenseContent">
                    <div className="expenseTitleRow">
                      <h3 className="expenseTitle">{expense.description}</h3>
                      <span className="categoryBadge">
                        <Tag size={12} />
                        {expense.category}
                      </span>
                    </div>
                    <div className="expenseDate">
                      <Calendar size={14} />
                      {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="expenseRight">
                    <span className="expenseAmount">${expense.amount.toFixed(2)}</span>
                    <div className="actionButtons">
                      <button
                      data-testid={`edit-expense-${expense.id}`}
                        onClick={() => handleEdit(expense)}
                        className={`editButton ${hoveredButton === `edit-${expense.id}` ? 'editButtonHover' : ''}`}
                        onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                      data-testid={`delete-expense-${expense.id}`}
                        onClick={() => handleRemoveExpense(expense)}
                        className={`deleteButton ${hoveredButton === `delete-${expense.id}` ? 'deleteButtonHover' : ''}`}
                        onMouseEnter={() => setHoveredButton(`delete-${expense.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Delete"
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

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        handleSubmit={handleSubmit}
        editingId={editingId}
        hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton}
      />
    </div>
  );
};

export default ExpenseTracker;
