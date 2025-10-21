
import axios from "axios";
import { Expense } from "../types/ExpenseDetails";

const API_URL = 'http://localhost:3005'

export const getExpenses = async() =>{
    const response = await axios.get(`${API_URL}/`)
    return response.data.getExpenses
}

export const addTheExpense = async(expenses:Expense) => {
    const response = await axios.post(`${API_URL}/expense`,expenses)
    return response.data
}

export const updateTheExpense = async(expenses:Expense) => {
    const response = await axios.put(`${API_URL}/expense/${expenses.id}`,expenses)
    console.log("Api editing Id",expenses.id)
    return response.data
}

export const deleteTheExpense = async(expenseId:number) => {
    const response = await axios.delete(`${API_URL}/expense/${expenseId}`)
    console.log("Api delete Id",expenseId)
    return response.data
}
