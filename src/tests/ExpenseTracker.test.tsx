import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExpenseTracker } from '../components/ExpenseTracker';
import * as expenseApi from '../services/expenseApi';

jest.mock('../services/expenseApi');

const mockExpenses = [
  { id: '1', description: 'Groceries', amount: 85.5, category: 'Food', date: '2025-10-05' },
  { id: '2', description: 'Gas', amount: 45.0, category: 'Transport', date: '2025-10-06' },
];

describe('ExpenseTracker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays initial expenses and shows total', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce(mockExpenses);
    render(<ExpenseTracker />);
    expect(screen.getByTestId('total-amount')).toHaveTextContent('₹0.00');
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Gas')).toBeInTheDocument();
    });
    expect(screen.getByTestId('total-amount')).toHaveTextContent('₹130.50');
  });
  it('shows loading indicator while fetching', async () => {
    (expenseApi.getExpenses as jest.Mock).mockImplementation(() => new Promise(() => {})); 
    render(<ExpenseTracker />);
    expect(screen.getByText(/Loading expenses/i)).toBeInTheDocument();
  });

  it('opens add-new-expense modal', () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce(mockExpenses); 
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByTestId('add-expense-button'));
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Add New Expense');
  });

  it('validates form submission', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce(mockExpenses);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});  
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByTestId('add-expense-button'));
    fireEvent.submit(screen.getByTestId('submit-button')); 
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields correctly.');
    });
    alertSpy.mockRestore();
  });

  it('edits an existing expense successfully', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce(mockExpenses);
    (expenseApi.updateExpense as jest.Mock).mockResolvedValueOnce({});
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce([
      { id: '1', description: 'Groceries vegetables', amount: 100, category: 'Food', date: '2025-10-05' },
      mockExpenses[1],
    ]);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ExpenseTracker />); 
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTitle(/Edit/i)[0]);
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Edit Expense');   
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Groceries vegetables' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
    fireEvent.click(screen.getByTestId('submit-button'));    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Expense updated successfully!');
      expect(screen.getByText('Groceries vegetables')).toBeInTheDocument();
      expect(screen.getByTestId('total-amount')).toHaveTextContent('₹145.00');
    });
    alertSpy.mockRestore();
  });

  it('deletes an expense successfully upon confirmation', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValueOnce(mockExpenses);
    (expenseApi.deleteExpense as jest.Mock).mockResolvedValueOnce({});
    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);    
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})    
    render(<ExpenseTracker />);
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTitle(/Delete/i)[0]);
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Expense deleted successfully!');
      expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    });
    alertSpy.mockRestore();
  });

  it('renders total amount correctly', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValue(mockExpenses);    
    render(<ExpenseTracker />);    
    expect(screen.getByText(/Loading expenses.../i)).toBeInTheDocument();    
    await waitFor(() => {
      expect(screen.queryByText(/Loading expenses.../i)).not.toBeInTheDocument();
    });    
    const totalAmount = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
    expect(screen.getByTestId('total-amount')).toHaveTextContent(`₹${totalAmount.toFixed(2)}`);
  });
  it('opens and closes modal when clicking Add Expense and Cancel', async () => {
    (expenseApi.getExpenses as jest.Mock).mockResolvedValue([]);    
    render(<ExpenseTracker />);    
    const addButton = screen.getByTestId('add-expense-button');
    fireEvent.click(addButton);    
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Add New Expense');    
    fireEvent.click(screen.getByTestId('cancel-button'));    
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });
});
