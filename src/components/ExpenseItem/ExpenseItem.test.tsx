import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseItem } from './ExpenseItem';
import { Expense } from '../../types/expense';

describe('ExpenseItem component', () => {
  const mockExpense: Expense = {
    id: 1,
    description: 'Groceries',
    amount: 85.50,
    category: 'Food',
    date: '2025-10-05'
  };

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders expense details and handles hover states', () => {
    render(<ExpenseItem expense={mockExpense} {...mockHandlers} />);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('$85.50')).toBeInTheDocument();
    expect(screen.getByText(/Oct 5, 2025/)).toBeInTheDocument();

    const expenseItem = screen.getByText('Groceries').closest('div');
    fireEvent.mouseEnter(expenseItem!);
    fireEvent.mouseLeave(expenseItem!);
  });

  it('calls handlers and manages button hover states', () => {
    render(<ExpenseItem expense={mockExpense} {...mockHandlers} />);

    const editButton = screen.getByTitle('Edit');
    const deleteButton = screen.getByTitle('Delete');

    fireEvent.mouseEnter(editButton);
    fireEvent.mouseLeave(editButton);
    fireEvent.click(editButton);

    fireEvent.mouseEnter(deleteButton);
    fireEvent.mouseLeave(deleteButton);
    fireEvent.click(deleteButton);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockExpense);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockExpense.id);
  });
});