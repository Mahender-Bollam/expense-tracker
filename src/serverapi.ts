import { apiData } from "./api";
import { Expense } from "./interfaces/expense";

export const addExpense = async (expenseData: Expense) => { 
    try {
        const response = await fetch(apiData, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error adding expense:', error); 
        throw error; 
    }
};
