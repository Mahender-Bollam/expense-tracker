import { render, screen } from "@testing-library/react";
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
});
















