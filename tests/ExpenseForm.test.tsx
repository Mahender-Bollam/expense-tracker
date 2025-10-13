import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseForm from '../src/components/ExpenseForm';
import { FormData } from '../src/types/interface';

describe('ExpenseForm', () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockSetFormData = jest.fn();
  const mockSetHoveredButton = jest.fn();
  const mockOnClose = jest.fn();

  const formData: FormData = {
    description: '',
    amount: '',
    category: '',
    date: '',
  };

  const categories = ['Food', 'Transport'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(
      <ExpenseForm
        isOpen={true}
        onClose={mockOnClose}
        formData={formData}
        setFormData={mockSetFormData}
        categories={categories}
        handleSubmit={mockHandleSubmit}
        editingId={null}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
      />
    );

    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  });

  test('calls handleSubmit on form submission', () => {
    render(
      <ExpenseForm
        isOpen={true}
        onClose={mockOnClose}
        formData={formData}
        setFormData={mockSetFormData}
        categories={categories}
        handleSubmit={mockHandleSubmit}
        editingId={null}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
      />
    );

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Groceries' },
    });
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: 'Food' },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2025-10-12' },
    });

    const form = screen.getByText(/Add Expense/i).closest('form');
    expect(form).not.toBeNull();

    fireEvent.submit(form!);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <ExpenseForm
        isOpen={true}
        onClose={mockOnClose}
        formData={formData}
        setFormData={mockSetFormData}
        categories={categories}
        handleSubmit={mockHandleSubmit}
        editingId={null}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when overlay is clicked', () => {
    render(
      <ExpenseForm
        isOpen={true}
        onClose={mockOnClose}
        formData={formData}
        setFormData={mockSetFormData}
        categories={categories}
        handleSubmit={mockHandleSubmit}
        editingId={null}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
      />
    );

    const overlay = document.querySelector('.overlay');
    expect(overlay).not.toBeNull();

    fireEvent.click(overlay!);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
