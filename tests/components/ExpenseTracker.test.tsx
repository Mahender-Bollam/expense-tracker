import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseTracker from '../../src/components/ExpenseTracker';

describe('ExpenseTracker Component', () => {

    test('edits an existing expense', async () => {
      render(<ExpenseTracker />);
      const editButtons = screen.getAllByTitle('Edit');
      fireEvent.click(editButtons[0]);
      await waitFor(() => {
        expect(screen.getByText(/Edit Expense/i)).toBeInTheDocument();
      });
      const descriptionInput = screen.getByPlaceholderText(/Enter description/i);
      fireEvent.change(descriptionInput, {
        target: { value: 'Updated Groceries' },
      });
      const updateButton = screen.getByText(/Update Expense/i);
      fireEvent.click(updateButton);
      await waitFor(() => {
        expect(screen.getByText('Updated Groceries')).toBeInTheDocument();
      });
    });
    test('displays multiple expenses with different categories', () => {
      render(<ExpenseTracker />);
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Gas')).toBeInTheDocument();
      expect(screen.getAllByText('Food').length).toBeGreaterThan(0);
      expect(screen.getByText('Transport')).toBeInTheDocument();
    });
    test('hover effects work on add button', () => {
      render(<ExpenseTracker />);
      const addButton = screen.getAllByText(/Add Expense/i)[0];
      fireEvent.mouseEnter(addButton);
      fireEvent.mouseLeave(addButton);
      expect(addButton).toBeInTheDocument();
    });
    test('hover effects work on edit and delete buttons', () => {
      render(<ExpenseTracker />);
      const updateButtons = screen.getAllByTitle('Edit');
      const deleteButtons = screen.getAllByTitle('Delete');
      fireEvent.mouseEnter(updateButtons[0]);
      fireEvent.mouseLeave(updateButtons[0]);
      fireEvent.mouseEnter(deleteButtons[0]);
      fireEvent.mouseLeave(deleteButtons[0]);
      expect(updateButtons[0]).toBeInTheDocument();
      expect(deleteButtons[0]).toBeInTheDocument();
    });
    test('displays correct date format for expenses', () => {
      render(<ExpenseTracker />);
      expect(screen.getByText(/Oct 5, 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/Oct 6, 2025/i)).toBeInTheDocument();
    });
    test('clears form data when modal is closed', async () => {
      render(<ExpenseTracker />);
      const addButton = screen.getAllByText(/Add Expense/i)[0];
      fireEvent.click(addButton);
      await waitFor(() => {
        expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
      });
      fireEvent.change(screen.getByPlaceholderText(/Enter description/i), {
        target: { value: 'Test' },
      });
      const cancelButton = screen.getByText(/Cancel/i);
      fireEvent.click(cancelButton);
      fireEvent.click(addButton);
      await waitFor(() => {
        expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
      });
      const descriptionInput = screen.getByPlaceholderText(/Enter description/i) as HTMLInputElement;
      expect(descriptionInput.value).toBe('');
    });

     test('displays total expenses correctly', () => {
      render(<ExpenseTracker />);
      expect(screen.getByText('$130.50')).toBeInTheDocument();
    });
    test('closes modal when Cancel button is clicked', async () => {
      render(<ExpenseTracker />);
      const addButton = screen.getAllByText(/Add Expense/i)[0];
      fireEvent.click(addButton);
      await waitFor(() => {
        expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
      });
      const cancelButton = screen.getByText(/Cancel/i);
      fireEvent.click(cancelButton);
      await waitFor(() => {
        expect(screen.queryByText(/Add New Expense/i)).not.toBeInTheDocument();
      });
    });
     test('shows validation alert when adding expense without required fields', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        render(<ExpenseTracker />);
        const addButtons = screen.getAllByText(/Add Expense/i);
        fireEvent.click(addButtons[0]);
        await waitFor(() => {
          expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
        });
        const submitButtons = screen.getAllByText(/Add Expense/i);
        fireEvent.click(submitButtons[submitButtons.length - 1]);
        expect(alertMock).toHaveBeenCalledWith('Missed it, so fill in all fields');
        alertMock.mockRestore();
     });
     test('edits expense and updates date correctly', async () => {
      render(<ExpenseTracker />);
      const editButtons = screen.getAllByTitle('Edit');
      fireEvent.click(editButtons[0]);
      await waitFor(() => {
        expect(screen.getByText(/Edit Expense/i)).toBeInTheDocument();
      });
      const dateInputs = screen.getAllByDisplayValue('2025-10-05');
      fireEvent.change(dateInputs[0], {
        target: { value: '2025-10-15' },
      });
      const updateButton = screen.getByText(/Update Expense/i);
      fireEvent.click(updateButton);
      await waitFor(() => {
        expect(screen.getByText(/Oct 15, 2025/i)).toBeInTheDocument();
      });
    });
});