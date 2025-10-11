import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExpenseTracker } from '../components/ExpenseTracker';

describe('ExpenseTracker Component', () => {

  it('renders the ExpenseTracker component and displays initial expenses', () => {
    render(<ExpenseTracker />);
    expect(screen.getByTestId('total-amount')).toHaveTextContent('₹130.50');
    expect(screen.getByTestId('add-expense-button')).toBeInTheDocument();
  });

  it('opens the modal when "Add Expense" button is clicked', () => {
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByTestId('add-expense-button'));
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Add New Expense');
  });

  it('renders description input field correctly', () => {
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByTestId('add-expense-button'));
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
  });

  it('adds a new expense when the form is submitted', async () => {
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByTestId('add-expense-button'));
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'New Expense' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '50.00' } });
    fireEvent.change(screen.getByTestId('category-input'), { target: { value: 'Food' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2025-10-10' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
    });

    expect(screen.getByText('New Expense')).toBeInTheDocument();
    expect(screen.getByText('₹50.00')).toBeInTheDocument();
  });
});

