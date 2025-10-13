import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/types';
import '@testing-library/jest-dom';

jest.mock('../components/ExpenseItem', () => (props: any) => (
  <div
    data-testid="expense-item"
    onClick={() => props.onEdit(props.expense)}
    onDoubleClick={() => props.onDelete(props.expense.id)}
  >
    {props.expense.description}
  </div>
));

describe('ExpenseList component', () => {
  const mockSetHoveredExpense = jest.fn();
  const mockSetHoveredButton = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const baseProps = {
    hoveredExpense: null,
    setHoveredExpense: mockSetHoveredExpense,
    hoveredButton: null,
    setHoveredButton: mockSetHoveredButton,
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state message when no expenses are passed', () => {
    render(<ExpenseList expenses={[]} {...baseProps} />);

    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
  });

  test('renders list of expenses', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        description: 'Movie',
        amount: 12,
        category: 'Entertainment',
        date: '2025-10-10',
      },
      {
        id: 2,
        description: 'Bus Ticket',
        amount: 3,
        category: 'Transport',
        date: '2025-10-11',
      },
    ];

    render(<ExpenseList expenses={expenses} {...baseProps} />);

    const items = screen.getAllByTestId('expense-item');
    expect(items.length).toBe(2);
    expect(screen.getByText('Movie')).toBeInTheDocument();
    expect(screen.getByText('Bus Ticket')).toBeInTheDocument();
  });

  test('calls onEdit when expense item is clicked', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        description: 'Lunch',
        amount: 15,
        category: 'Food',
        date: '2025-10-10',
      },
    ];

    render(<ExpenseList expenses={expenses} {...baseProps} />);

    const item = screen.getByTestId('expense-item');
    fireEvent.click(item);

    expect(mockOnEdit).toHaveBeenCalledWith(expenses[0]);
  });

  test('calls onDelete when expense item is double-clicked', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        description: 'Taxi',
        amount: 20,
        category: 'Transport',
        date: '2025-10-11',
      },
    ];

    render(<ExpenseList expenses={expenses} {...baseProps} />);

    const item = screen.getByTestId('expense-item');
    fireEvent.doubleClick(item);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
