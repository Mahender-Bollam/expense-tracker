import { checkExpenseFields, checkAmountValue, validateExpense } from './validations';
import { FormData } from '../types/expense';

describe('Expense validation utilities', () => {
  describe('checkExpenseFields', () => {
    it('should return invalid when description is empty', () => {
      const data: FormData = {
        description: '',
        amount: '50',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = checkExpenseFields(data);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Description is required');
    });

    it('should return invalid when amount is empty', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = checkExpenseFields(data);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Amount is required');
    });

    it('should return invalid when category is empty', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '50',
        category: '',
        date: '2025-10-10'
      };
      
      const result = checkExpenseFields(data);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Category is required');
    });

    it('should return invalid when date is empty', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '50',
        category: 'Food',
        date: ''
      };
      
      const result = checkExpenseFields(data);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Date is required');
    });

    it('should return valid when all fields are filled', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '50',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = checkExpenseFields(data);
      expect(result.isValid).toBe(true);
    });
  });

  describe('checkAmountValue', () => {
    it('should return invalid when amount is not a number', () => {
      const result = checkAmountValue('abc');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Amount must be a number');
    });

    it('should return invalid when amount is zero', () => {
      const result = checkAmountValue('0');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Amount must be greater than 0');
    });

    it('should return invalid when amount is negative', () => {
      const result = checkAmountValue('-10');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Amount must be greater than 0');
    });

    it('should return valid when amount is positive', () => {
      const result = checkAmountValue('50.75');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateExpense', () => {
    it('should return invalid when fields are missing', () => {
      const data: FormData = {
        description: '',
        amount: '50',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = validateExpense(data);
      expect(result.isValid).toBe(false);
    });

    it('should return invalid when amount is invalid', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '-5',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = validateExpense(data);
      expect(result.isValid).toBe(false);
    });

    it('should return valid when all validations pass', () => {
      const data: FormData = {
        description: 'Lunch',
        amount: '50',
        category: 'Food',
        date: '2025-10-10'
      };
      
      const result = validateExpense(data);
      expect(result.isValid).toBe(true);
    });
  });
});