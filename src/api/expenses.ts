import axios from 'axios';
import { Expense } from '../types/expenseType';

const API_URL = 'http://localhost:3000';

export const addExpense = async (expense: Expense) => {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
};
