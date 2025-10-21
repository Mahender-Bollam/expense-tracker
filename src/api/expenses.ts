import axios from 'axios';
import { Expense } from '../types/expenseType';

const API_URL = 'http://localhost:3000';

export const addExpense = async (expense: Expense) => {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
};
export const editExpense = async (expense:Expense)=>{
    const response = await axios.put(`${API_URL}/expenses/${expense.id}`,expense)
    return response.data
}
export const deleteExpense = async (expenseId:number)=>{
    const response = await axios.delete(`${API_URL}/expenses/${expenseId}`)
    return response.data
}
