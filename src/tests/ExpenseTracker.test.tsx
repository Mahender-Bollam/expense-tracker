import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExpenseTracker } from '../components/ExpenseTracker';
import userEvent from '@testing-library/user-event';

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

it('closes modal and resets form data when Cancel button is clicked', async () => {
  render(<ExpenseTracker />);
  fireEvent.click(screen.getByTestId('add-expense-button')); 
  fireEvent.click(screen.getByTestId('cancel-button'));
  await waitFor(() => {
    expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
  });
});


it('opens modal with existing expense data when Edit is clicked', () => {
  render(<ExpenseTracker />);
  const editButtons = screen.getAllByTitle(/edit/i);
  fireEvent.click(editButtons[0]);
  expect(screen.getByTestId('modal-title')).toHaveTextContent('Edit Expense');
  expect(screen.getByTestId('description-input')).toHaveValue('Groceries');
});

it('deletes an expense after user confirms in handleDelete', async () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<ExpenseTracker />);

  const expenseItems = await screen.findAllByTestId(/expense-item-/i);
  expect(expenseItems.length).toBeGreaterThan(0);

  fireEvent.click(screen.getAllByTitle('Delete')[0]);

  await waitFor(() =>
    expect(window.confirm).toHaveBeenCalledWith('Are you sure want to delete this expense?')
  );
  await waitFor(() =>
    expect(window.alert).toHaveBeenCalledWith('Expense deleted successfully!')
  );
});

it('opens add expense modal with default category set', async () => {
  render(<ExpenseTracker />);

  const addButton = screen.getByTestId('add-expense-button');
  fireEvent.click(addButton);

  const categorySelect = await screen.findByTestId('category-input');
  expect(categorySelect).toBeInTheDocument();
  expect((categorySelect as HTMLSelectElement).value).toBe('Food');
});
  it('updates an existing expense when the edit form is submitted', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ExpenseTracker />);
    const editButtons = screen.getAllByTitle(/edit/i);
    await user.click(editButtons[0]);
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Edit Expense');
    const descriptionInput = await screen.findByTestId('description-input');
    const amountInput = await screen.findByTestId('amount-input');
    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Updated Groceries');
    await user.clear(amountInput);
    await user.type(amountInput, '100.00');
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
    });
    await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith("Expense updated successfully!");
  });
    expect(screen.getByText('Updated Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.getByText('₹100.00')).toBeInTheDocument();
    mockAlert.mockRestore();
  });

  it('shows an alert when the form is submitted with incomplete data', async () => {

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<ExpenseTracker />);
    await user.click(screen.getByTestId('add-expense-button'));
    await user.clear(screen.getByTestId('description-input'));
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Please fill in all fields correctly.');
    });
    await waitFor(() => {
       expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });
    mockAlert.mockRestore();
  });

  it('shows an alert when the form is submitted with invalid amount (negative or zero)', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ExpenseTracker />);
    await user.click(screen.getByTestId('add-expense-button'));
    await user.type(screen.getByTestId('description-input'), 'Invalid Amount');
    await user.type(screen.getByTestId('amount-input'), '-10.00');
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Please fill in all fields correctly.');
    });
    await waitFor(() => {
       expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });

    mockAlert.mockRestore();
  });
});



