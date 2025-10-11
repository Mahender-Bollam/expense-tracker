import {  Expense, ValidateExpenseParam} from "../types/type";


export const validateExpense = ([newExpense, expenses, editingId]: ValidateExpenseParam)=>{
    const today  = (new Date()).toJSON().slice(0,10);
    if(newExpense.category.trim().length ===0 || newExpense.description.trim().length ===0 || Number(newExpense.amount) <= 0 ){
        alert(`Please provide the valid details`);
        return false;
    };
    if( Number(newExpense.date.replace(/-/g,'')) > Number(today.replace(/-/g,''))){
        alert(`Future date i.e ${newExpense.date} expense can't add in today i.e date: ${today}`);
        return false;
    }
    if(expenses.some(item=>item.description === newExpense.description) && !editingId){
        alert(`The entered expense ${newExpense.description} alredy exists`);
        return false;
    }
    return true;  
};

export const setIdOfExpense = (arr:Expense[]):number=>{
    if(arr.length === 0){return 1}
    return arr.length+1;
};
