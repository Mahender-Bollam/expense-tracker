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

  test("adds new expense when valid data is submitted", () => {
    const props = {
      ...baseProps,
      formData: {
        description: "Lunch",
        amount: "200",
        category: "Food",
        date: "2025-10-10",
      },
    };
    render(<ExpenseForm {...props} />);
    fireEvent.click(screen.getByText("Add Expense"));
    expect(mockSetExpenses).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).toHaveBeenCalled();
  });
  
  test("updates expense", () => {
    const mockExpenses = [
      { id: 1, description: "Old", amount: 50, category: "Food", date: "2025-10-09" },
    ];
    const props = {
      ...baseProps,
      formData: {
        description: "Updated",
        amount: "100",
        category: "Food",
        date: "2025-10-10",
      },
      editingId: 1,
      expenses: mockExpenses,
    };
    render(<ExpenseForm {...props} />);
    fireEvent.click(screen.getByText("Update Expense"));
    expect(mockSetExpenses).toHaveBeenCalledWith([
      { id: 1, description: "Updated", amount: 100, category: "Food", date: "2025-10-10" },
    ]);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("calls closeModal when Cancel button is clicked", () => {
    render(<ExpenseForm {...baseProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("handles hover events correctly", () => {
    render(<ExpenseForm {...baseProps} />);
    const addButton = screen.getByText("Add Expense");
    fireEvent.mouseEnter(addButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith("submit");
    fireEvent.mouseLeave(addButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });

  test("handles hover events on Cancel button", () => {
    render(<ExpenseForm {...baseProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.mouseEnter(cancelButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith("cancel");
    fireEvent.mouseLeave(cancelButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });
  
  test("handles hover events on close button", () => {
    render(<ExpenseForm {...baseProps} />);
    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.mouseEnter(closeButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith("close");
    fireEvent.mouseLeave(closeButton);
    expect(mockSetHoveredButton).toHaveBeenCalledWith(null);
  });
  
  test("calls setFormData when typing description", () => {
    render(<ExpenseForm {...baseProps} />);
    const descInput = screen.getByPlaceholderText("Enter description");
    fireEvent.change(descInput, { target: { value: "Groceries" } });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...baseProps.formData,
      description: "Groceries",
    });
  });

  test("calls setFormData when entering amount", () => {
    render(<ExpenseForm {...baseProps} />);
    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "100" } });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...baseProps.formData,
      amount: "100",
    });
  });
});











