import { Expense } from "./Expense";
import { FormData } from "./FormData";

export interface ExpenseOperationsProps{
    expenses:Expense[],
    formData:FormData,
    editingId:number|null
    setIsModalOpen:Function,
    setEditingId:Function,
    setFormData:Function,
    setExpenses:Function,

}