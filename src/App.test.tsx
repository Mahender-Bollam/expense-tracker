import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Expense Tracker testcases", () => {
  describe("UI testcases", () => {
    test("renders learn react link", () => {
      render(<App />);
      const linkElement = screen.getByText(/Expense Tracker/i);
      expect(linkElement).toBeInTheDocument();
    });
    test("I should open Modal properly" ,async()=>{
      render(<App />);
      const button = screen.getByRole("button" , {name: /Add Expense/});
      await userEvent.click(button)
      expect(screen.getByText("Add New Expense")).toBeInTheDocument();
    })
  });
  describe("Functional Testcases" , ()=>{

    test("Checking the input fields" , async()=>{
      render(<App />)
      const addExpenseBtn = screen.getByRole("button" , {name : /Add Expense/i});
      userEvent.click(addExpenseBtn);
      
      const descriptionField = screen.getByPlaceholderText("Enter description")
      const amountField = screen.getByPlaceholderText("0.00")
      const categoryField = screen.getByText("Category")
      const dateField = screen.getByTestId("date")

      await userEvent.type(descriptionField , "Tea")
      await userEvent.type(amountField , "200")
      await userEvent.type(categoryField , "Food")
      await userEvent.type(dateField , "10/10/2025")

    })
  
  test("it should add an expensive and trigger alert",async()=>{
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<App />)
      const addExpenseBtn = screen.getByText("Add Expense");
      await userEvent.click(addExpenseBtn);
      expect(screen.getByText("Add New Expense")).toBeInTheDocument()
      
      const descriptionField = screen.getByPlaceholderText("Enter description")
      const amountField = screen.getByPlaceholderText("0.00")
      const categoryField = screen.getByText("Category")
      const dateField = screen.getByTestId("date")

      await userEvent.type(descriptionField , "Tea")
      await userEvent.type(amountField , "200")
      await userEvent.type(categoryField , "Food")
      await userEvent.type(dateField , "10/10/2025") 
      const button = screen.getAllByRole("button" , { name : "Add Expense"})
      await userEvent.click(button[1])

      expect(mockAlert).toHaveBeenCalled()

  })
  })

});
