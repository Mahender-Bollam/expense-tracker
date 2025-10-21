import { Expense } from "../interface/Expense";
import { ExpenseOperationsProps } from "../interface/ExpenseOperationsProps";
import axios from "axios";

const useExpenseOperations=(props:ExpenseOperationsProps)=>{

  const closeModal = (): void => {
    props.setIsModalOpen(false);
    props.setEditingId(null);
    props.setFormData({
      id:0,
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (expense: Expense): void => {
    props.setFormData({
      id:expense.id,
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    props.setEditingId(expense.id);
    props.setIsModalOpen(true);
  };

  const handleAdd = (): void => {
     props.setFormData({
      id:0,
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    props.setIsModalOpen(true);
    props.setEditingId(null)
  };

const handleDelete=(expense:Expense)=>{  
  alert("Are you sure to delete expense?")
  axios({
    method: 'delete',
    url: `http://localhost:4000/expenses/${expense.id}`
  });
}

const addExpense=()=>{
  props.setIsModalOpen(false);
  props.setEditingId(null);
  if(props.formData.amount===""|| props.formData.category===""||props.formData.date===""||props.formData.description===""){
    alert("Please fill all the fields.")
    return props.setIsModalOpen(true)
  }
  else if(parseInt(props.formData.amount)<=0){
    alert("Amount must be greater than zero.")
    return props.setIsModalOpen(true)
  }
  else{
  const {description,amount,category,date}=props.formData
  const expense:Expense= {id:expenses.length+1,
    description,
    amount:parseInt(amount),
    category,
    date}
    axios({
    method: 'post',
    url: 'http://localhost:4000/expenses',
    data: expense
  });
    }
}
const updateExpense=()=>{
  if(props.formData.amount===""|| props.formData.category===""||props.formData.date===""||props.formData.description===""){
    alert("Please fill all the fields.")
    return props.setIsModalOpen(true)
  }
  else if(parseInt(props.formData.amount)<=0){
    alert("Amount must be greater than zero.")
    return props.setIsModalOpen(true)
  }
  else{
  props.setIsModalOpen(false)
  const {id,description,amount,category,date}=props.formData
  const expense:Expense= {id, description, amount:parseInt(amount), category, date}
    axios({
    method: 'put',
    url: `http://localhost:4000/expenses/${expense.id}`,
    data: expense
  });
}
}
const expenses=props.expenses
return {closeModal,handleAdd,addExpense,updateExpense,handleDelete,handleEdit,expenses}
}

export default useExpenseOperations;