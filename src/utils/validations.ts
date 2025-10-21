import { FormData } from '../types/expense';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const checkExpenseFields = (data: FormData): ValidationResult => {
  if (!data.description.trim()) {
    return { isValid: false, message: 'Description is required' };
  }
  
  if (!data.amount.trim()) {
    return { isValid: false, message: 'Amount is required' };
  }
  
  if (!data.category) {
    return { isValid: false, message: 'Category is required' };
  }
  
  if (!data.date) {
    return { isValid: false, message: 'Date is required' };
  }
  
  return { isValid: true, message: '' };
};

export const checkAmountValue = (amount: string): ValidationResult => {
  const numAmount = Number(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, message: 'Amount must be a number' };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, message: 'Amount must be greater than 0' };
  }
  
  return { isValid: true, message: '' };
};

export const validateExpense = (data: FormData): ValidationResult => {
  const fieldsCheck = checkExpenseFields(data);
  if (!fieldsCheck.isValid) {
    return fieldsCheck;
  }
  
  const amountCheck = checkAmountValue(data.amount);
  if (!amountCheck.isValid) {
    return amountCheck;
  }
  
  return { isValid: true, message: '' };
};