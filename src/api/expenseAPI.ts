import axios from 'axios';
import { Expense } from '../hooks/expenseTracker';

const API_URL = 'http://localhost:3005'; 

export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data.data as Expense[];
};


export const addExpense = async (expense: Expense) => {
  const response = await axios.post(`${API_URL}/expenses`, expense);
  return response.data;
};

export const updateExpense = async (expense: Expense) => {
  const response = await axios.put(`${API_URL}/expenses/${expense.id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`${API_URL}/expenses/${id}`);
  return response.data;
};
