import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../models/expense';

const expenses: Expense[] = [
    { id: 1, description: 'Coffee', amount: 3.5, category: 'Food', date: '2025-10-01' },
    { id: 2, description: 'Taxi', amount: 15, category: 'Transport', date: '2025-10-02' },
];

describe('ExpenseList Component', () => {
    it('renders all expenses', () => {
        render(
            <ExpenseList
                expenses={expenses}
                hoveredExpense={null}
                setHoveredExpense={() => { }}
                onEdit={() => { }}
                onDelete={() => { }}
            />
        );

        expenses.forEach(exp => {
            expect(screen.getByText(exp.description)).toBeInTheDocument();
            expect(screen.getByText(new RegExp(exp.category, 'i'))).toBeInTheDocument();
        });
    });

    it('calls onEdit and onDelete on button clicks', () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        const setHoveredExpense = jest.fn();

        render(
            <ExpenseList
                expenses={expenses}
                hoveredExpense={null}
                setHoveredExpense={setHoveredExpense}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );


        const coffeeItem = screen.getByTestId('expense-item-Coffee');
        fireEvent.mouseEnter(coffeeItem);
        expect(setHoveredExpense).toHaveBeenCalledWith(1);

        fireEvent.mouseLeave(coffeeItem);
        expect(setHoveredExpense).toHaveBeenCalledWith(null);


        fireEvent.click(screen.getAllByTitle('Edit')[0]);
        expect(onEdit).toHaveBeenCalledWith(expenses[0]);

        fireEvent.click(screen.getAllByTitle('Delete')[1]);
        expect(onDelete).toHaveBeenCalledWith(expenses[1].id);
    });
});

