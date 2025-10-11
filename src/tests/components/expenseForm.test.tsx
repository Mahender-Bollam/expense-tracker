import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "../../components/expenseForm";
import "@testing-library/jest-dom";
import { Expense } from "../../interface/expense";
import { FormData } from "../../interface/formData";

describe("ExpenseForm Component", () => {
  const mockSetFormData = jest.fn();
  const mockSetExpenses = jest.fn();
  const mockCloseModal = jest.fn();
  const mockSetHoveredButton = jest.fn();

  const baseProps = {
    formData: {
      description: "",
      amount: "",
      category: "",
      date: "",
    } as FormData,

    setFormData: mockSetFormData,
    categories: ["Food", "Transport", "Bills"],
    editingId: null,
    setExpenses: mockSetExpenses,
    expenses: [] as Expense[],
    closeModal: mockCloseModal,
    hoveredButton: null,
    setHoveredButton: mockSetHoveredButton,
    styles: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("display all input fields", () => {
    render(<ExpenseForm {...baseProps} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", () => {
    render(<ExpenseForm {...baseProps} />);
    fireEvent.click(screen.getByText("Add Expense"));
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Amount should be greater than 0")).toBeInTheDocument();
    expect(screen.getByText("Select a category")).toBeInTheDocument();
    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(mockSetExpenses).not.toHaveBeenCalled();
  });

});











