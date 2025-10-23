import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseTracker from '../components/ExpenseTracker';
import ExpenseList from '../components/ExpenseList';
import TotalCard from '../components/TotalCard';
import ExpenseModal from '../components/ExpenseModal';
import Header from '../components/Header';
import { Expense, HoveredButton, HoveredExpense, FormData } from '../types/types';

const expenses: Expense[] = [
  { id: 1, description: 'Groceries', amount: 85.5, category: 'Food', date: '2025-10-05' },
  { id: 2, description: 'Gas', amount: 45.0, category: 'Transport', date: '2025-10-06' },
];

const mockSetHoveredExpense: React.Dispatch<React.SetStateAction<HoveredExpense>> = jest.fn();
const mockSetHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>> = jest.fn();
const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();
const mockOnAdd = jest.fn();
const mockOnClose = jest.fn();
const mockSetFormData: React.Dispatch<React.SetStateAction<FormData>> = jest.fn();
const mockOnSubmit = jest.fn();

const mockFormData: FormData = {
  description: 'Dinner',
  amount: '30.00',
  category: 'Food',
  date: '2025-10-10',
};

const mockCategories = ['Food', 'Transport', 'Utilities'];

describe('Child Components Render', () => {
  it('renders ExpenseList without crashing', () => {
    render(
      <ExpenseList
        expenses={expenses}
        hoveredExpense={null}
        setHoveredExpense={mockSetHoveredExpense}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
  });

  it('renders TotalCard without crashing', () => {
    render(<TotalCard total={130.5} />);
    expect(screen.getByText('$130.50')).toBeInTheDocument();
  });

  it('renders Header without crashing', () => {
    render(
      <Header onAddClick={mockOnAdd} hoveredButton={null} setHoveredButton={mockSetHoveredButton} />
    );
    expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  });

  it('renders ExpenseModal without crashing', () => {
    render(
      <ExpenseModal
        isOpen={true}
        onClose={mockOnClose}
        formData={mockFormData}
        setFormData={mockSetFormData}
        categories={mockCategories}
        onSubmit={mockOnSubmit}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
        editingId={null}
      />
    );
    expect(screen.getByPlaceholderText(/Enter description/i)).toBeInTheDocument();
  });
});

describe('ExpenseTracker Integration', () => {
  it('opens modal when Add button is clicked', () => {
    render(<ExpenseTracker />);
    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
  });
it('alerts if form fields are empty on submit', () => {
    window.alert = jest.fn();
    render(<ExpenseTracker />);
    
    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.click(addButton);
    
    const buttons = screen.getAllByRole('button', { name: /Add Expense/i });
    const submitButton = buttons[buttons.length - 1];
    fireEvent.click(submitButton);
    
    expect(window.alert).toHaveBeenCalledWith('Please fill all fields');
  });
it('edits an expense', () => {
    render(<ExpenseTracker />);
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(screen.getByDisplayValue('Groceries')).toBeInTheDocument();

    const descriptionInput = screen.getByPlaceholderText(/Enter description/i);
    fireEvent.change(descriptionInput, { target: { value: 'Updated Expense' } });
    
    const updateButton = screen.getByRole('button', { name: /Update Expense/i });
    fireEvent.click(updateButton);
    
    expect(screen.queryByText(/Update Expense/i)).not.toBeInTheDocument();
  });

  it('deletes an expense', () => {
    window.alert = jest.fn();
    render(<ExpenseTracker />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(window.alert).toHaveBeenCalledWith('Deleted Successfully');
  });
});