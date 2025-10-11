import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTracker from "../../components/expenseTracker";
import "@testing-library/jest-dom";

describe("ExpenseTracker Component", () => {
    
  test("renders initial expenses correctly", () => {
    render(<ExpenseTracker />);
    expect(screen.getByText("Expense Tracker")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Gas")).toBeInTheDocument();
    expect(screen.getByText("$130.50")).toBeInTheDocument();
  });

  test("opens Add Expense modal when Add Expense button is clicked", () => {
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByText("Add Expense"));
    expect(screen.getByText("Add New Expense")).toBeInTheDocument();
  });

  test("opens Edit Expense modal when Edit button is clicked", () => {
    render(<ExpenseTracker />);
    const editButton = screen.getAllByTitle("Edit")[0];
    fireEvent.click(editButton);
    expect(screen.getByText("Edit Expense")).toBeInTheDocument();
  });

});
















