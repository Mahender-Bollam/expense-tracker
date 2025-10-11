import React, { useState} from 'react';
import { DollarSign} from 'lucide-react';
import { FormData, ModalProps, Expense} from './types/type';
import { styles } from './styles/styles';
import { EditOrAddExpenseButton , OpenOrCloseModelButton } from './components/Buttons';
import { RecentExpenses } from './components/RecentExpensesCard';


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
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

  const handleEdit = (expense: Expense):void=> {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const validateExpenses = (newExpense:FormData)=>{
    if(formData.category.trim().length ===0 || formData.description.trim().length ===0 || Number(formData.amount) <= 0 ){
      alert(`Please provide the valid details`);
      return false;
    }
    if(expenses.some(item=>item.description === newExpense.description) && !editingId){
      alert(`The entered expense ${newExpense.description} alredy exists`);
      return false;
    }
    return true;  
  }

  const setIdOfExpense = (arr:Expense[]):number=>{
    if(arr.length === 0){return 1}
    return arr.length+1;
  }

  const addExpense = ()=>{
    if(validateExpenses(formData)){
      setExpenses([...expenses,{...formData,id:setIdOfExpense(expenses),amount:Number(formData.amount)}]);
      closeModal();
    }else{
      setIsModalOpen(true);
    };
  };

  const deleteExpense = (expenseToDelete:Expense)=>{
    alert(`The expense with description ${expenseToDelete.description} will be deleted`);
    setExpenses(expenses.filter(item=>item.description !== expenseToDelete.description));
    closeModal();
  }

  const editExpense = (expenseId:number)=>{

    if(!validateExpenses(formData)){return setIsModalOpen(true)};
    const findExpense :number = expenses.findIndex(item=>item.id === expenseId);
    if(findExpense !== -1){
      expenses[findExpense]={...formData,id:expenseId,amount:Number(formData.amount)};
      setExpenses(expenses);
      closeModal();
    };
    setIsModalOpen(false);
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
            <OpenOrCloseModelButton  title='Add Expense'  setIsModalOpen={setIsModalOpen} />
          </div>

          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>${totalExpense.toFixed(2)}</p>
          </div>
        </div>

        <div style={styles.card}>
          <RecentExpenses expenses={expenses} handleEdit={handleEdit} deleteExpense={deleteExpense}/>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <OpenOrCloseModelButton   title='close' closeModel={closeModal}/>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
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
          <label style={styles.label}>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <EditOrAddExpenseButton editingId={editingId} editExpense={editExpense} addExpense={addExpense}/>
          <OpenOrCloseModelButton  title='cancel' closeModel={closeModal}/>
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;