import React, { useState ,useEffect} from 'react';
import { Expense, FormData, HoveredButton, HoveredExpense } from '../types/types';
import Header from './Header';
import TotalCard from './TotalCard';
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import styles from '../styles/ExpenseTracker.module.css';
import axios from "axios"
const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    
  ]);

  //Add Expense
const postData = async () => {
  try {
    await axios.post(`http://localhost:3000/expenses`, {
      
      "description": formData.description,
      "amount": formData.amount,
      "category": formData.category,
      "date": formData.date
    });

    closeModal();
  } catch (error) {
    
    console.error("There was an error posting the data:", error);
  }
};

  
 
useEffect(() => {
    
    console.log("Expenses state has been updated:", expenses);
  }, [expenses]);
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
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
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

const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);


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
