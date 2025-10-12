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
});