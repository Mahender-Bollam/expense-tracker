import React, { createContext, useState} from 'react';
import { FormData, Expense, ShareFormDataType} from './types/type';
import { styles } from './styles/styles';
import { RecentExpenses } from './components/RecentExpensesCard';
import { setIdOfExpense, validateExpense } from './utils/ValidateExpense';
import { HeaderCard } from './components/HeaderCard';
import { ChildOfModalComponent } from './components/ChildOfModalComp';
import { Modal } from './components/PopupModal';

export const ShareFormData = createContext<ShareFormDataType>({
  dataOfForm:{
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  },
  setDataOfForm: ()=>{}
})
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

  const addExpense = ()=>{
    if(validateExpense([formData,expenses,editingId])){
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
  };

  const editExpense = (expenseId:number)=>{
    if(!validateExpense([formData,expenses,editingId])){return setIsModalOpen(true)};
    const findExpense :number = expenses.findIndex(item=>item.id === expenseId);
    if(findExpense !== -1){
      expenses[findExpense]={...formData,id:expenseId,amount:Number(formData.amount)};
      setExpenses(expenses);
      closeModal();
    };
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>   
        <HeaderCard expenses={expenses} setIsModalOpen={setIsModalOpen}/>
        <div style={styles.card}>
          <RecentExpenses expenses={expenses} handleEdit={handleEdit} deleteExpense={deleteExpense}/>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ShareFormData value={{dataOfForm:formData,setDataOfForm:setFormData}}>
          <ChildOfModalComponent editingId={editingId} editExpense={editExpense} addExpense={addExpense} closeModal={closeModal}/>
        </ShareFormData>  
      </Modal>
    </div>
  );
};

export default ExpenseTracker;