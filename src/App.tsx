import React, { useState} from 'react';
import { Plus, DollarSign} from 'lucide-react';
import { Expense } from './types/expenseType';
import { FormData } from './types/formDataType';
import { styles } from './styles/Styles';
import Model from './components/ModalCard';
import ExpenseCard from './components/ExpenseCard';
import { HoveredButton, HoveredExpense } from './types/hoverTypes';


const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ]);
  
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    id:expenses.length+1
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);
  
  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      id:expenses.length+1
    });
  };
  const handleAdd = ():void =>{
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      id: expenses.length+1
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
                ...styles.addButton,...styles.actionButtons,
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
        hoveredExpense={hoveredExpense} setHoveredExpense={setHoveredExpense}setFormData={setFormData} 
        setEditingId={setEditingId} setIsModalOpen={setIsModalOpen} setExpenses={setExpenses}/>
      </div>
      <Model isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeModal={closeModal} 
     editingId={editingId} hoveredButton={hoveredButton} 
    setHoveredButton={setHoveredButton} formData={formData}
      setFormData={setFormData} expenses={expenses} setExpenses={setExpenses}/>

    </div>
  );
};

export default ExpenseTracker;