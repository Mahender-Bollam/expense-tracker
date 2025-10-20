import React, { useEffect, useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { Expense } from './types/expenseType';
import { FormData } from './types/formDataType';
import { styles } from './styles/Styles';
import ExpenseCard from './components/ExpenseCard';
import { HoveredButton, HoveredExpense } from './types/hoverTypes';
import ModalCard from './components/ModalCard';


const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const getResult = async() =>{
    const url = "http://localhost:3000/expenses"
    fetch(url,{
      method: 'GET'
    })
      .then(r => r.json())
      .then(setExpenses);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  useEffect(()=>{
    getResult()
  })
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    id: expenses.length + 1
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);

  const handleAdd = (): void => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      id: expenses.length + 1
    });
    setEditingId(null);
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
              onClick={() => handleAdd()}
              style={{
                ...styles.addButton, ...styles.actionButtons,
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
        <ExpenseCard expenses={expenses} hoveredButton={hoveredButton} setHoveredButton={setHoveredButton}
          hoveredExpense={hoveredExpense} setHoveredExpense={setHoveredExpense} setFormData={setFormData}
          setEditingId={setEditingId} setIsModalOpen={setIsModalOpen} setExpenses={setExpenses} />
      </div>
      <ModalCard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEditingId={setEditingId}
        editingId={editingId} hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton} formData={formData}
        setFormData={setFormData} expenses={expenses} setExpenses={setExpenses} />

    </div>
  );
};

export default ExpenseTracker;