import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders the expense tracker title and subtitle', () => {
    render(<App />);
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
    expect(screen.getByText('Manage your daily expenses efficiently')).toBeInTheDocument();
  });

  it('displays initial expenses and calculates total correctly', () => {
    render(<App />);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Gas')).toBeInTheDocument();
    expect(screen.getByText('$130.50')).toBeInTheDocument();
  });

  it('opens and closes modal when Add Expense button and Cancel are clicked', () => {
    render(<App />);
    expect(screen.queryByText('Add New Expense')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));
    expect(screen.getByText('Add New Expense')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Add New Expense')).not.toBeInTheDocument();
  });

  it('adds a new expense and updates total', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Coffee' } });
    
    fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '5.50' } });
    
    const selectElement = screen.getByDisplayValue('Select category');
    fireEvent.change(selectElement, { target: { value: 'Food' } });
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2025-10-10' } });
    
    const submitButtons = screen.getAllByText('Add Expense');
    fireEvent.click(submitButtons[1]);
    
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$5.50')).toBeInTheDocument();
    expect(screen.getByText('$136.00')).toBeInTheDocument();
  });

  it('deletes an expense and updates total', () => {
    render(<App />);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$45\.00/)[0]).toBeInTheDocument();
  });

  it('opens edit modal with pre-filled data and updates expense', () => {
    render(<App />);
    
    const editButtons = screen.getAllByTitle('Edit');
    fireEvent.click(editButtons[0]);

    expect(screen.getByText('Edit Expense')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Groceries')).toBeInTheDocument();
    
    fireEvent.change(screen.getByDisplayValue('Groceries'), { target: { value: 'Supermarket' } });
    fireEvent.click(screen.getByText('Update Expense'));
    
    expect(screen.getByText('Supermarket')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
  });

  it('resets form data when modal is closed without submitting', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));

    fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Cancel'));
    
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));
    expect(screen.getByPlaceholderText('Enter description')).toHaveValue('');
  });

  it('handles button hover states', () => {
    render(<App />);
    
    const addButton = screen.getByRole('button', { name: /add expense/i });
    fireEvent.mouseEnter(addButton);
    fireEvent.mouseLeave(addButton);

    const editButtons = screen.getAllByTitle('Edit');
    fireEvent.mouseEnter(editButtons[0]);
    fireEvent.mouseLeave(editButtons[0]);

    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.mouseEnter(deleteButtons[0]);
    fireEvent.mouseLeave(deleteButtons[0]);
  });

  it('handles expense item hover states', () => {
    render(<App />);
    
    const expenseItem = screen.getByText('Groceries').closest('div');
    fireEvent.mouseEnter(expenseItem!);
    fireEvent.mouseLeave(expenseItem!);
  });
});