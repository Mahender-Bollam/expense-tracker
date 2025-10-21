import axios from 'axios';
const API = "http://localhost:3000";
export const getExpense = async () => {
    const response = await axios.get(`${API}/expense`);
    if(!response){
        throw new Error("Failed to load")
    }
    return response.data;
} 

