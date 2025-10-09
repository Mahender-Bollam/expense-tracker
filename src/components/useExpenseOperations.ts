import { Expense } from "../interface/Expense";
import { ExpenseOperationsProps } from "../interface/ExpenseOperationsProps";
const useExpenseOperations=({expenses,formData,editingId,setIsModalOpen,setEditingId,setFormData,setExpenses}:ExpenseOperationsProps)=>{
let localId:number=expenses.length;
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
  if(formData.amount===""|| formData.category===""||formData.date===""||formData.description===""){
    alert("Please fill all the fields.")
    return setIsModalOpen(true)
  }
  else if(parseInt(formData.amount)<=0){
    alert("Amount must be greater than zero.")
    return setIsModalOpen(true)
  }
  else{
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
}
const handleUpdate=(e:any)=>{
  const existing=expenses.find(existingExpense=>existingExpense.id===formData.id)
  if(formData.amount===""|| formData.category===""||formData.date===""||formData.description===""){
    alert("Please fill all the fields.")
    return setIsModalOpen(true)
  }
  else if(parseInt(formData.amount)<=0){
    alert("Amount must be greater than zero.")
    return setIsModalOpen(true)
  }
  else if(!existing){
   return alert("Expense is not found")
  }
  else{
  setFormData({
    id:localId,
    description:e.target.value,
    amount:e.target.value,
    category:e.target.value,
    date:e.target.value
    })
    const {description,amount,category,date}=formData
    const updatedExpense={
      id:localId+1,
      description,
      amount:parseInt(amount),
      category,
      date
    }
   setExpenses((expenses:Expense[])=>expenses.map(expense=>expense.id===formData.id?updatedExpense:expense))
  
  setIsModalOpen(false)
}
}
const handleClick=(e:any)=>{
  editingId?handleUpdate(e):handleAddData(e)
}
return {closeModal,handleAdd,handleAddData,handleClick,handleDelete,handleEdit,handleUpdate}
}

export default useExpenseOperations;