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