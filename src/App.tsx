import React, { useState, CSSProperties, useEffect } from 'react';
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag, X } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import { Expense,FormData,ModalProps  } from './interfaces/expense';
import { HoveredButton,HoveredExpense } from './types/expense';
import { styles } from './styles/expense-tracker';
import { Modal } from './modal';
import { apiData } from './api';
import { addExpense } from './serverapi';

 
 

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    ]);
const getExpenses = async () => {
    try {
      const response = await fetch(apiData);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
useEffect(() => {
   getExpenses();
  }, []);



  
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount:0 ,
    category: '',
    id:0,
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
      amount: 0,
      category: '',
      id:0,
      date: new Date().toISOString().split('T')[0]
    });
  };
  const openModal = (): void => {
    setIsModalOpen(true);
    setEditingId(null);
    setFormData({
      description: '',
      amount: 0,
      category: '',
      id:0,
      date: new Date().toISOString().split('T')[0]
    });
 
  };



  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      id:expense.id
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  
   const handledeleteItem=(id:number)=>{
    console.log('chaitanya')
    alert("Are you sure you want to delete this expense? ")

    setExpenses((prev) => prev.filter((item) => item.id!== id));
   }



  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);




 const handleAddExpense=async ():Promise<any>=> {
  if (editingId) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === editingId ? { ...formData, id: editingId } : expense
      )
    );
    alert('Expense updated successfully');
    closeModal();
  }
    else{
      if(formData.amount<=0 || !formData.category || !formData.description || !formData.date){
      alert('Please Enter all details and amount must be postive')
      return 
      }
      else{
      const newExpense = { ...formData, id: Date.now() };
      await addExpense(newExpense);
      setExpenses((prev) => [...prev, newExpense]);
      alert('Add Expense  successfull')
      closeModal();
      }
}
 }

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
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={openModal}
             >
              <Plus size={20} />
              Add Expense
            </button>

          </div>
         

          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
  
             <p style={styles.totalAmount}>${typeof totalExpense === 'number' ? totalExpense.toFixed(2) : '0.00'}</p>
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
                     ${typeof expense.amount === 'number' ? expense.amount.toFixed(2) : 'N/A'}
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
                      <button onClick={()=>handledeleteItem(expense.id)}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
             title="Close Modal"
            onClick={closeModal}
            style={{
              ...styles.closeButton,
              ...(hoveredButton === 'close' ? styles.closeButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('close')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <X size={24} />
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            style={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: Number(e.target.value )})}
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>Category</label>
          <select
            id="category" 
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
            style={styles.input}
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="date"style={styles.label}>Date</label>
          <input
           id='date'
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={() => handleAddExpense()}
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
           >
            {editingId ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
            onClick={closeModal}
            style={{
              ...styles.secondaryButton,
              ...(hoveredButton === 'cancel' ? styles.secondaryButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('cancel')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;

