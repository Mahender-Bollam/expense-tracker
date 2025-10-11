import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Expense } from "../../interface/expense";
import ExpenseList from "../../components/expenseList";

const mockExpenses: Expense[] = [
  { id: 1, description: "Groceries", amount: 50, category: "Food", date: "2025-10-05" },
  { id: 2, description: "Electric Bill", amount: 120, category: "Bills", date: "2025-10-06" },
];

describe("ExpenseList Component", () => {
  test("displays 'No expenses yet' message when no expenses", () => {
    render(
      <ExpenseList
        expenses={[]}
        handleEdit={jest.fn()}
        handleDelete={jest.fn()}
        hoveredButton={null}
        setHoveredButton={jest.fn()}
        hoveredExpense={null}
        setHoveredExpense={jest.fn()}
        styles={{}}
      />
    );
    expect(screen.getByText("No expenses yet. Add your first expense above!")).toBeInTheDocument();
  }); 

  test("triggers setHoveredButton on hover over Edit and Delete buttons", () => {
    const mockSetHoveredButton = jest.fn();
    render(
      <ExpenseList
        expenses={[mockExpenses[0]]}
        handleEdit={jest.fn()}
        handleDelete={jest.fn()}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
        hoveredExpense={null}
        setHoveredExpense={jest.fn()}
        styles={{}}
      />
    );
    const editButton = screen.getByTitle("Edit");
    const deleteButton = screen.getByTitle("Delete");
    fireEvent.mouseEnter(editButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith("edit-1");
    fireEvent.mouseLeave(editButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
    fireEvent.mouseEnter(deleteButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith("delete-1");
    fireEvent.mouseLeave(deleteButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });
});















