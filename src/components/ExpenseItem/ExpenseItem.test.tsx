import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpenseItem from './ExpenseItem';
import { Expense } from '../../types/types';

const mockExpense: Expense = {
    id: 1,
    description: 'Dinner',
    amount: 500,
    category: 'Food',
    date: '2025-10-10'
};

const mockSetHoveredExpense = jest.fn();
const mockSetHoveredButton = jest.fn();
const mockEdit = jest.fn();
const mockDelete = jest.fn();

const renderComponent = () => {
    return render(
        <ExpenseItem
            expense={mockExpense}
            hoveredExpense={null}
            hoveredButton={null}
            setHoveredExpense={mockSetHoveredExpense}
            setHoveredButton={mockSetHoveredButton}
            onEdit={mockEdit}
            onDelete={mockDelete}
        />
    );
}

describe('ExpenseItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders expense correctly', () => {
        renderComponent()

        expect(screen.getByText('Dinner')).toBeInTheDocument();
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('$500.00')).toBeInTheDocument();
        expect(screen.getByText('Oct 10, 2025')).toBeInTheDocument();
    });

    it('calls onEdit on edit button click', () => {
        renderComponent()

        fireEvent.click(screen.getByTestId('expense-edit'));
        expect(mockEdit).toHaveBeenCalledWith(mockExpense);
    });

    it('calls onDelete on delete button click', () => {
        renderComponent()

        fireEvent.click(screen.getByTestId('expense-delete'));
        expect(mockDelete).toHaveBeenCalledWith(mockExpense.id);
    });

    it('hover functionality works correctly for row', () => {
        const { getByTestId } = renderComponent()

        const row = getByTestId('expense-row');
        fireEvent.mouseEnter(row);
        expect(mockSetHoveredExpense).toHaveBeenCalledWith(mockExpense.id);
        fireEvent.mouseLeave(row);
        expect(mockSetHoveredExpense).toHaveBeenCalledWith(null);
    });

    it('hover functionality works correctly for edit button', () => {
        const { getByTestId } = renderComponent()

        const editBtn = getByTestId('expense-edit');
        fireEvent.mouseEnter(editBtn);
        expect(mockSetHoveredButton).toHaveBeenCalledWith(`edit-${mockExpense.id}`);
        fireEvent.mouseLeave(editBtn);
        expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
    });

    it('hover functionality works correctly for delete button', () => {
        const { getByTestId } = renderComponent()

        const deleteBtn = getByTestId('expense-delete');
        fireEvent.mouseEnter(deleteBtn);
        expect(mockSetHoveredButton).toHaveBeenCalledWith(`delete-${mockExpense.id}`);
        fireEvent.mouseLeave(deleteBtn);
        expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
    });
});
