import React, { useState, CSSProperties,useEffect } from 'react';
import { Expense, FormData, HoveredButton, HoveredExpense } from '../types/expenseData';
import Modal from './Modal'; 
import { Trash2, Edit2, Plus, DollarSign, Calendar,X, Tag } from 'lucide-react';  
import '../App.css';

const styles: Record<string, CSSProperties> = {
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
 secondaryButtonHover: 
 { backgroundColor: '#f9fafb' } };



const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

 const handleAddExpense = async (): Promise<void> => {
 
  if (!formData.description || !formData.amount || !formData.category) {
    alert('Missed it, so fill in all fields');
    return;
  }

  const parsedDate = new Date(formData.date);
  if (isNaN(parsedDate.getTime())) { 
    alert('Invalid date');
    return;
  }

  const formattedDate = parsedDate.toISOString(); 
   const expenseData = {
    description: formData.description,
    amount: parseFloat(formData.amount),
    category: formData.category,
    date: formattedDate 
  };

  try {
   
    const response = await fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expenseData)
    });

    if (!response.ok) {
      throw new Error('Failed to add expense: ' + response.statusText);
    }

   const newExpense = await response.json();
   console.log(newExpense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

  } catch (error) {
    console.error('Error adding expense:', error);
  }

  closeModal();
};

const handleDeleteExpense =async (id: number):  Promise<void> => {
  try {
    const deleteExpense = await fetch(`http://localhost:3001/expenses/${id}`, {
      method: 'DELETE',
    });

       if (deleteExpense) { 
        setExpenses(expenses.filter((expense) => expense.id !== id));
       } else { 
        console.error('Failed to delete expense'); 
      }
     } catch (error) { 
      console.error('Not deleted the expense:', error); 
    }
};

const handleUpdateExpense = async (): Promise<void> => {
  if (!formData.description || !formData.amount || !formData.category) {
    alert('Missed it, so fill in all fields');
    return;
  }
  const updatedExpense = {
    description: formData.description,
    amount: parseFloat(formData.amount),
    category: formData.category,
    date: formData.date
  };

  try {
   
      const response = await fetch(`http://localhost:3001/expenses/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExpense)
      });

      if (!response.ok) {
        throw new Error('Failed to update the expense item');
      }

      const updatedData = await response.json();
        setExpenses((prevExpenses) =>
         prevExpenses.map((expense) =>
          expense.id === editingId ? updatedData : expense
        )
      );
    
  } catch (error) {
     console.error('Error updating expense:', error);
  }
  closeModal();
};
useEffect(() => {
  const dbExpenses = async () => {
    try {

      const expenseResponse = await fetch('http://localhost:3001/expenses');
      const data = await  expenseResponse.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  dbExpenses();
}, []);


  const [editingId, setEditingId] = useState<number|null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton|null>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense|null>(null);

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


  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className='container'>
      <div className='maxWidth'>
        <div className='card'>
          <div className='header'>
            <div className='titleWrapper'>
              <h1 className='tile'>
                <DollarSign color="#6366f1" size={32} />
                Expense Tracker
              </h1>
              <p className='subtitile'>Manage your daily expenses efficiently</p>
            </div>
            <button
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
              }}
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>

          <div className='totalCard'>
            <p className='totalLabel'>Total Expenses</p>
            <p className='totalAmount'>${totalExpense.toFixed(2)}</p>
          </div>
        </div>

        <div className='card'>
          <h2 className='sectionTitle'>Recent Expenses</h2>
          
          {expenses.length === 0 ? (
            <p className='emptyState'>No expenses yet. Add your first expense above!</p>
          ) : (
            <div className='expenseList'>
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
                  <div className='expenseContent'>
                    <div className='expenseTitleRow'>
                      <h3 className='expenseTitle'>{expense.description}</h3>
                      <span className='categoryBadge'>
                        <Tag size={12} />
                        {expense.category}
                      </span>
                    </div>
                    <div className='expenseDate'>
                      <Calendar size={14} />
                      {new Date(expense.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>

                  <div className='expenseRight'>
                    <span className='expenseAmount'>
                      {/* ${expense.amount.toFixed(2)} */}
                      ${expense.amount != null && !isNaN(expense.amount) ? expense.amount.toFixed(2) : '0.00'}
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
                       onClick={(e) => handleDeleteExpense(expense.id)}
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
        <div className='modalHeader'>
          <h2 className='modalTitle'>
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
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

        <div className='formGroup'>
          <label className='label'>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            className='input'
            placeholder="Enter description"
          />
        </div>

        <div className='formGroup'>
          <label className='label'>Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
            className='input'
            placeholder="0.00"
          />
        </div>

        <div className='formGroup'>
          <label className='label'>Category</label>
          <select
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
            className='input'
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='formGroup'>
          <label className='label'>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            className='input'
          />
        </div>
       <button  onClick={() => setIsModalOpen(true)}> </button>
        <div className='buttonGroup'>
          <button
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onClick={editingId ? handleUpdateExpense : handleAddExpense}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
           
          >
            {
            editingId ? 'Update Expense': 'Add Expense'}
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
 