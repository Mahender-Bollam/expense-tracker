import { Expense } from '../types/type';

export const fetchExpenses= async():Promise<Expense[]|Error>=>{
    try{
        const response = await(await fetch('http://localhost:3005/expenses/')).json();  
        return response as Expense[];
    }catch(error){
        return error as Error;
    }
};

export const addExpenseWithAPI= async(expense:string):Promise<string|Error>=>{
    try{
        const response = await (await fetch('http://localhost:3005/expenses/', {
                method: 'POST',
                body : expense,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        ).text()
        return response as unknown as string;
    }catch(error){
        return error as Error;
    }
};