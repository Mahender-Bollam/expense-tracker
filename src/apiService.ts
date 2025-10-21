import axios from 'axios';
const API = "http://localhost:3000";
export const getExpense = async () => {
    const response = await axios.get(`${API}/expense`);
    if (!response) {
        throw new Error("Failed to load")
    }
    return response.data;
}

export const postData = async (id: number, expense: {
    description: string,
    category: string,
    amount: number,
}) => {
    const response = await axios.post(`${API}/expense/${id}`, expense, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response) {
        console.log("Expense Added")
    }
    else {
        console.log("Failed to push")
    }
}
export const deleteExpense = async (id:number) =>{
    const response = await axios.delete(`${API}/expens/${id}`);
    if(!response){
        console.log("Failed to delete");
    }
    else{
        console.log("Expense deleted")
    }
}
export const updateExpense = async(id:number, expense:{
    description: string,
    category: string,
    amount: number
}) => {
    const response = await axios.put(`${API}/expense/${id}`,expense,{
         headers :{
            'Content-Type': 'application/json'
        }
    })
    if(!response){
        console.log("Expense not updated")
    }
    else {
        console.log("Expense updated");
    }
}