import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseTracker from '../src/components/ExpenseTracker';
import { act } from 'react-dom/test-utils';

beforeAll(() => {
  window.alert = jest.fn();
});

describe('ExpenseTracker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders header and total correctly', () => {
    render(<ExpenseTracker />);
    expect(screen.getByText(/Expense Tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Expenses/i)).toBeInTheDocument();
    expect(screen.getByText('$130.50')).toBeInTheDocument();
  });

  test('renders initial expenses and total', () => {
    render(<ExpenseTracker />);
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
    expect(screen.getByText(/Gas/i)).toBeInTheDocument();
    expect(screen.getByText(/\$85.50/i)).toBeInTheDocument();
    expect(screen.getByText(/\$45.00/i)).toBeInTheDocument();
    expect(screen.getByText(/\$130.50/i)).toBeInTheDocument(); // total
  });

  test('opens form modal when clicking Add Expense', () => {
    render(<ExpenseTracker />);
    const addButtons = screen.getAllByText(/Add Expense/i);
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
  });

  test('adds a new expense correctly', () => {
    render(<ExpenseTracker />);
    const addButtons = screen.getAllByText(/Add Expense/i);
    fireEvent.click(addButtons[0]);

    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Coffee' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '5.50' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Food' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-10-10' } });

    const submitButton = screen.getByText(/Add Expense/i, { selector: 'button[type="submit"]' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Coffee')).toBeInTheDocument();
  });

  test('edits an existing expense correctly', () => {
    render(<ExpenseTracker />);
    const editButtons = screen.getAllByTitle('Edit');
    fireEvent.click(editButtons[0]);

    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Supermarket' } });
    const updateButton = screen.getByText(/Update Expense/i);
    fireEvent.click(updateButton);

    expect(screen.getByText('Supermarket')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
  });

  test('deletes an expense correctly', () => {
    render(<ExpenseTracker />);
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(window.alert).toHaveBeenCalledWith('Expense deleted successfully!');
  });

  test('hover on add expense button triggers hover state', () => {
    render(<ExpenseTracker />);
    const addButton = screen.getByText(/Add Expense/i).closest('button')!;
    fireEvent.mouseEnter(addButton);
    fireEvent.mouseLeave(addButton);
  });

  test('hover on edit and delete buttons triggers hover state', () => {
    render(<ExpenseTracker />);
    const editButtons = screen.getAllByTitle('Edit');
    const deleteButtons = screen.getAllByTitle('Delete');

    fireEvent.mouseEnter(editButtons[0]);
    fireEvent.mouseLeave(editButtons[0]);

    fireEvent.mouseEnter(deleteButtons[0]);
    fireEvent.mouseLeave(deleteButtons[0]);
  });

  test('clicking delete button removes expense', () => {
    render(<ExpenseTracker />);
    const deleteButtons = screen.getAllByTitle('Delete');

    act(() => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(screen.queryByText(/Groceries/i)).not.toBeInTheDocument();
  });

  test('clicking edit button opens modal and fills form', () => {
    render(<ExpenseTracker />);
    const editButtons = screen.getAllByTitle('Edit');

    act(() => {
      fireEvent.click(editButtons[0]);
    });

    expect(screen.getByLabelText(/Description/i)).toHaveValue('Groceries');
    expect(screen.getByLabelText(/Amount/i)).toHaveValue(85.5);
    expect(screen.getByLabelText(/Category/i)).toHaveValue('Food');
  });
});
