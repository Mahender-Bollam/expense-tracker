import React, { useState } from 'react';
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag } from 'lucide-react';
import { Expense } from '../interface/Expense';
import { FormData } from '../interface/FormData';
import { styles } from '../styles/ExpenseTracker';
import ModalCard from './ModalCard';


type HoveredButton = string | null;
type HoveredExpense = number | null;


const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ]);
  const [formData, setFormData] = useState<FormData>({
    id:0,
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  let localId:number=expenses.length;
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      id:0,
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (expense: Expense): void => {
    setFormData({
      id:expense.id,
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const handleAdd = (): void => {
    setIsModalOpen(true);
  };

const handleDelete=(expense:Expense)=>{  
  alert("Are you sure to delete expense?")
  setExpenses(()=>{return expenses.filter(addedExpense=>addedExpense.id!==expense.id)})
}

const handleAddData=(e:any)=>{
  setIsModalOpen(false);
  setEditingId(null);
  setFormData({
    id:localId+1,
    description:e.target.value,
    amount:e.target.value,
    category:e.target.value,
    date:e.target.value
    });
  const {description,amount,category,date}=formData
  setExpenses(()=>{return [...expenses,
    {id:localId+1,
    description,
    amount:parseInt(amount),
    category,
    date}]})
  console.log(expenses)
}
const handleUpdate=(e:any)=>{
  setFormData({
    id:localId,
    description:e.target.value,
    amount:e.target.value,
    category:e.target.value,
    date:e.target.value
    })
  const existing=expenses.find(existingExpense=>existingExpense.id===formData.id)
  if(existing){
    const {description,amount,category,date}=formData
    const updatedExpense={
      id:localId+1,
      description,
      amount:parseInt(amount),
      category,
      date
    }
   setExpenses((expenses:Expense[])=>expenses.map(expense=>expense.id===formData.id?updatedExpense:expense))
  }
  setIsModalOpen(false)
}
const handleClick=(e:any)=>{
  editingId?handleUpdate(e):handleAddData(e)
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
            onClick={()=>handleAdd()}
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
                      <h3 style={styles.expenseTitle}>{expense.description}</h3>
                      <span style={styles.categoryBadge}>
                        <Tag size={12} />
                        {expense.category}
                      </span>
                    </div>
                    <div style={styles.expenseDate}>
                      <Calendar size={14} />
                      {new Date(expense.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>

                  <div style={styles.expenseRight}>
                    <span style={styles.expenseAmount}>
                      ${expense.amount.toFixed(2)}
                    </span>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(expense)}
                        style={{
                          ...styles.editButton,
                          ...(hoveredButton === `edit-${expense.id}` ? styles.editButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`edit-${expense.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                      onClick={()=>handleDelete(expense)}
                        style={{
                          ...styles.deleteButton,
                          ...(hoveredButton === `delete-${expense.id}` ? styles.deleteButtonHover : {})
                        }}
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
      <ModalCard 
      isModalOpen={isModalOpen} 
      closeModal={closeModal} 
      formData={formData} 
      setFormData={setFormData} 
      hoveredButton={hoveredButton} 
      setHoveredButton={setHoveredButton} 
      editingId={editingId} 
      handleClick={handleClick}/>
    </div>
  );
};

export default ExpenseTracker;