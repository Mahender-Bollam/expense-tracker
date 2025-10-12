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
});