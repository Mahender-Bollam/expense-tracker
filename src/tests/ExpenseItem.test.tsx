import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseItem from '../components/ExpenseItem';
import { Expense } from '../models/expense';

const expense: Expense = {
    id: "1",
    description: 'Dinner',
    amount: 20,
    category: 'Food',
    date: '2025-10-01',
};

describe('ExpenseItem Component', () => {
    it('renders details correctly', () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn().mockResolvedValue(undefined); 
        const setHoveredExpense = jest.fn();
        render(
            <ExpenseItem
                expense={expense}
                hoveredExpense={null}
                setHoveredExpense={setHoveredExpense}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
        expect(screen.getByText(/Dinner/i)).toBeInTheDocument();
        expect(screen.getByText(/₹20.00/)).toBeInTheDocument();
        expect(screen.getByText(/Food/i)).toBeInTheDocument();
        expect(screen.getByText(/2025-10-01/)).toBeInTheDocument();
    });

    it('handles hover events', () => {
        const setHoveredExpense = jest.fn();
        const onEdit = jest.fn();
        const onDelete = jest.fn().mockResolvedValue(undefined); 
        render(
            <ExpenseItem
                expense={expense}
                hoveredExpense={null}
                setHoveredExpense={setHoveredExpense}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
        const itemDiv = screen.getByTestId('expense-item-Dinner');
        fireEvent.mouseEnter(itemDiv);
        expect(setHoveredExpense).toHaveBeenCalledWith(expense.id);
        fireEvent.mouseLeave(itemDiv);
        expect(setHoveredExpense).toHaveBeenCalledWith(null);
    });

    it('calls onEdit and onDelete on button clicks', () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        render(
            <ExpenseItem
                expense={expense}
                hoveredExpense={null}
                setHoveredExpense={() => { }}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
        fireEvent.click(screen.getByTitle('Edit'));
        expect(onEdit).toHaveBeenCalledWith(expense);
        fireEvent.click(screen.getByTitle('Delete'));
        expect(onDelete).toHaveBeenCalledWith(expense.id);
    });
});
