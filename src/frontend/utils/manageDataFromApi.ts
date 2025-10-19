import { Expense } from '../types/type';
import axios from 'axios';
export const fetchExpenses= async():Promise<Expense[]|Error>=>{
    try{
        const response = (await axios.get('http://localhost:3005/expenses/')).data;  
        return response as Expense[];
    }catch(error){
        return error as Error;
    }
}