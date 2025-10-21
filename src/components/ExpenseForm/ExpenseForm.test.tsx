import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseForm } from './ExpenseForm';
import { FormData } from '../../types/expense';

describe('ExpenseForm component', () => {
  const mockFormData: FormData = {
    description: '',
    amount: '',
    category: '',
    date: '2025-10-11'
  };

  const mockHandlers = {
    onFormChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields and displays correct title based on editing state', () => {
    const { rerender } = render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);
    
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByText('Add New Expense')).toBeInTheDocument();

    rerender(<ExpenseForm formData={mockFormData} isEditing={true} {...mockHandlers} />);
    expect(screen.getByText('Edit Expense')).toBeInTheDocument();
    expect(screen.getByText('Update Expense')).toBeInTheDocument();
  });

  it('calls onFormChange when any input field changes', () => {
    render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Groceries' } });
    expect(mockHandlers.onFormChange).toHaveBeenCalledWith({ ...mockFormData, description: 'Groceries' });

    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50.00' } });
    expect(mockHandlers.onFormChange).toHaveBeenCalledWith({ ...mockFormData, amount: '50.00' });

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Food' } });
    expect(mockHandlers.onFormChange).toHaveBeenCalledWith({ ...mockFormData, category: 'Food' });

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-10-15' } });
    expect(mockHandlers.onFormChange).toHaveBeenCalledWith({ ...mockFormData, date: '2025-10-15' });
  });

  it('validates empty form and prevents submission', () => {
    window.alert = jest.fn();
    render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);

    fireEvent.click(screen.getByText('Add Expense'));
    
    expect(window.alert).toHaveBeenCalled();
    expect(mockHandlers.onSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form data successfully', () => {
    const validData: FormData = { 
      description: 'Lunch', 
      amount: '25.50', 
      category: 'Food', 
      date: '2025-10-11' 
    };
    
    render(<ExpenseForm formData={validData} isEditing={false} {...mockHandlers} />);

    fireEvent.click(screen.getByText('Add Expense'));
    expect(mockHandlers.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandlers.onCancel).toHaveBeenCalledTimes(1);
  });

  it('handles close button click in modal header', () => {
    const { container } = render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);
    
    const closeButton = container.querySelector('button[style*="background-color: transparent"]');
    fireEvent.click(closeButton!);
    
    expect(mockHandlers.onCancel).toHaveBeenCalledTimes(1);
  });

  it('handles button hover states', () => {
    render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);
    
    const submitButton = screen.getByText('Add Expense');
    const cancelButton = screen.getByText('Cancel');
    const { container } = render(<ExpenseForm formData={mockFormData} isEditing={false} {...mockHandlers} />);
    const closeButton = container.querySelector('button[style*="background-color: transparent"]');

    fireEvent.mouseEnter(submitButton);
    fireEvent.mouseLeave(submitButton);

    fireEvent.mouseEnter(cancelButton);
    fireEvent.mouseLeave(cancelButton);

    fireEvent.mouseEnter(closeButton!);
    fireEvent.mouseLeave(closeButton!);
  });
});