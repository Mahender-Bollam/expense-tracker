import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTracker from "../../components/expenseTracker";
import "@testing-library/jest-dom";

beforeAll(() => {
  window.confirm = jest.fn(() => true);
});

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

  test("deletes an expense when Delete button is clicked and confirmed", () => {
    (window.confirm as jest.Mock).mockReturnValueOnce(true);
    render(<ExpenseTracker />);
    const deleteButton = screen.getAllByTitle("Delete")[0];
    fireEvent.click(deleteButton);
    expect(window.confirm).toHaveBeenCalledWith("You want to delete this expense?");
    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
  });
  
  test("handles Add Expense button", () => {
    render(<ExpenseTracker />);
    const addButton = screen.getByText("Add Expense");
    fireEvent.mouseEnter(addButton);
    fireEvent.mouseLeave(addButton);
    expect(addButton).toBeInTheDocument();
  });

  test("closes modal when Cancel button is clicked", () => {
    render(<ExpenseTracker />);
    fireEvent.click(screen.getByText("Add Expense"));
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.queryByText("Add New Expense")).not.toBeInTheDocument();
  });

});
















