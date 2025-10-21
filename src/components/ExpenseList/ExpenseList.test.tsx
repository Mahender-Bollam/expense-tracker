import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseList } from './ExpenseList';
import { Expense } from '../../types/expense';

describe('ExpenseList component', () => {
  const mockExpenses: Expense[] = [
    {
      id: "1",
      description: 'Groceries',
      amount: 85.50,
      category: 'Food',
      date: '2025-10-05'
    },
    {
      id: "2",
      description: 'Gas',
      amount: 45.00,
      category: 'Transport',
      date: '2025-10-06'
    }
  ];

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display empty state when no expenses exist', () => {
    render(<ExpenseList expenses={[]} {...mockHandlers} />);

    expect(screen.getByText('No expenses yet. Add your first expense above!')).toBeInTheDocument();
  });

  it('should render all expenses when list is not empty', () => {
    render(<ExpenseList expenses={mockExpenses} {...mockHandlers} />);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Gas')).toBeInTheDocument();
  });

  it('should render correct number of expense items', () => {
    render(<ExpenseList expenses={mockExpenses} {...mockHandlers} />);

    const expenseItems = screen.getAllByText(/\$/);
    expect(expenseItems.length).toBeGreaterThanOrEqual(2);
  });

  it('should pass onEdit handler to expense items', () => {
    render(<ExpenseList expenses={mockExpenses} {...mockHandlers} />);

    const editButtons = screen.getAllByTitle('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockExpenses[0]);
  });

  it('should pass onDelete handler to expense items', () => {
    render(<ExpenseList expenses={mockExpenses} {...mockHandlers} />);

    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[1]);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockExpenses[1].id);
  });

  it('should not render empty state when expenses exist', () => {
    render(<ExpenseList expenses={mockExpenses} {...mockHandlers} />);

    expect(screen.queryByText('No expenses yet')).not.toBeInTheDocument();
  });
});