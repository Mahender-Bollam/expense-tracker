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
export const editExpense = async (expenseData: Expense,id:Number) => { 
    try {
        const response = await fetch(`${apiData}/${id}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error editing expense:', error); 
        throw error; 
    }
};
export const deleteExpense=async(id:number)=>{
   try {
        const response = await fetch(`${apiData}/${id}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error editing expense:', error); 
        throw error; 
    }
};
