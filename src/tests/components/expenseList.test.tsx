import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpenseList from "../../components/expenseList";


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
});















