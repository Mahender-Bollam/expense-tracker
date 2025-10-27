import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import { FormData } from '../../types/types';

const initialData: FormData = {
  description: '',
  amount: '',
  category: '',
  date: ''
};

const categories = ['Food', 'Travel', 'Utilities'];

const mockSetFormData = jest.fn();
const mockSetHoveredButton = jest.fn();
const mockSubmit = jest.fn();
const mockClose = jest.fn();

const renderComponent = () => {
  return render(
    <ExpenseForm
      formData={initialData}
      errors={{}}
      editingId={null}
      categories={categories}
      hoveredButton={null}
      setFormData={mockSetFormData}
      setHoveredButton={mockSetHoveredButton}
      onSubmit={mockSubmit}
      closeModal={mockClose}
    />
  );
}

describe('ExpenseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter date")).toBeInTheDocument();
    expect(screen.getByTestId("cateegoryid")).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('updates form data', () => {
    render(
      <ExpenseForm
        formData={{
          ...initialData,
          amount: '200'
        }}
        errors={{}}
        editingId={1}
        categories={categories}
        hoveredButton={null}
        setFormData={mockSetFormData}
        setHoveredButton={mockSetHoveredButton}
        onSubmit={mockSubmit}
        closeModal={mockClose}
      />
    );

    expect(screen.getByText('Edit Expense')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Enter description"), { target: { value: 'Lunch' } });
    fireEvent.change(screen.getByPlaceholderText("0.00"), { target: { value: '300' } });
    fireEvent.change(screen.getByTestId("cateegoryid"), { target: { value: 'Food' } });
    fireEvent.change(screen.getByPlaceholderText("Enter date"), { target: { value: '2025-10-10' } });

    expect(mockSetFormData).toHaveBeenCalledTimes(4);
  });

  it('calls onSubmit on submit button click', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('submit-button'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('calls closeModal when cancel button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls closeModal on close button click', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockClose).toHaveBeenCalled();
  });

  it('hover functionality works correctly for submit button', () => {
    const { getByTestId } = renderComponent()

    const submitBtn =getByTestId('submit-button');
    fireEvent.mouseEnter(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(`submit`);
    fireEvent.mouseLeave(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });

  it('hover functionality works correctly for close button', () => {
    const { getByTestId } = renderComponent()

    const submitBtn = getByTestId('close-button');
    fireEvent.mouseEnter(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(`close`);
    fireEvent.mouseLeave(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });

  it('hover functionality works correctly for close button', () => {
    const { getByTestId } = renderComponent()

    const submitBtn = getByTestId('cancel-button');
    fireEvent.mouseEnter(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(`cancel`);
    fireEvent.mouseLeave(submitBtn);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });
});
