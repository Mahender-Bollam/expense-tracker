import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseItem from '../components/ExpenseItem';
import { Expense, HoveredButton, HoveredExpense } from '../types/types';

const mockExpense: Expense = {
  id: 1,
  description: 'Groceries',
  amount: 45.5,
  category: 'Food',
  date: '2023-10-01',
};

const setHoveredExpense: React.Dispatch<React.SetStateAction<HoveredExpense>> = jest.fn();
const setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>> = jest.fn();
const onEdit = jest.fn();
const onDelete = jest.fn();

describe('ExpenseItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (isHovered = false) => {
    return render(
      <ExpenseItem
        expense={mockExpense}
        isHovered={isHovered}
        setHoveredExpense={setHoveredExpense}
        hoveredButton={null}
        setHoveredButton={setHoveredButton}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  };

  it('renders expense details correctly', () => {
    renderComponent();

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$45.50')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Oct 1, 2023')).toBeInTheDocument();
  });

  it('calls setHoveredExpense with expense id on mouse enter', () => {
    renderComponent();

    const descriptionHeading = screen.getByRole('heading', { name: 'Groceries' });

    fireEvent.mouseEnter(descriptionHeading);
    expect(setHoveredExpense).toHaveBeenCalledWith(mockExpense.id);
  });

  it('calls setHoveredExpense with null on mouse leave', () => {
    renderComponent();

    const descriptionHeading = screen.getByRole('heading', { name: 'Groceries' });

    fireEvent.mouseLeave(descriptionHeading);
    expect(setHoveredExpense).toHaveBeenCalledWith(null);
  });

  it('calls onEdit when edit button is clicked', () => {
    renderComponent();

    const editButton = screen.getByTitle('Edit');
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockExpense);
  });

  it('calls onDelete when delete button is clicked', () => {
    renderComponent();

    const deleteButton = screen.getByTitle('Delete');
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockExpense.id);
  });

  it('calls setHoveredButton on edit button hover', () => {
    renderComponent();

    const editButton = screen.getByTitle('Edit');

    fireEvent.mouseEnter(editButton);
    expect(setHoveredButton).toHaveBeenCalledWith(`edit-${mockExpense.id}`);

    fireEvent.mouseLeave(editButton);
    expect(setHoveredButton).toHaveBeenCalledWith(null);
  });

  it('calls setHoveredButton on delete button hover', () => {
    renderComponent();

    const deleteButton = screen.getByTitle('Delete');

    fireEvent.mouseEnter(deleteButton);
    expect(setHoveredButton).toHaveBeenCalledWith(`delete-${mockExpense.id}`);

    fireEvent.mouseLeave(deleteButton);
    expect(setHoveredButton).toHaveBeenCalledWith(null);
  });

  it('applies hover class to edit button when hoveredButton matches', () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        isHovered={false}
        setHoveredExpense={setHoveredExpense}
        hoveredButton={`edit-${mockExpense.id}`}
        setHoveredButton={setHoveredButton}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const editButton = screen.getByTitle('Edit');
    expect(editButton).toHaveClass('editButtonHover');
  });

  it('applies hover class to delete button when hoveredButton matches', () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        isHovered={false}
        setHoveredExpense={setHoveredExpense}
        hoveredButton={`delete-${mockExpense.id}`}
        setHoveredButton={setHoveredButton}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getByTitle('Delete');
    expect(deleteButton).toHaveClass('deleteButtonHover');
  });
});