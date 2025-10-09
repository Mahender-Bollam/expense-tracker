import {  fireEvent,render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ExpenseTracker from "../components/ExpenseTracker";
import userEvent from "@testing-library/user-event";

describe("ExpenseTracker",()=>{
    test("should display text in document",()=>{
        render(<ExpenseTracker/>)
        expect(screen.getByText("Manage your daily expenses efficiently")).toBeInTheDocument()
    })
    test("should check add expense click",()=>{
        render(<ExpenseTracker/>)
        const addButton=screen.getByRole("button",{name:"Add Expense"})
        userEvent.click(addButton);  
        fireEvent.mouseEnter(addButton);
        fireEvent.mouseLeave(addButton);
    })
    test("should check expense card",()=>{
        render(<ExpenseTracker/>)
        const expenseCard=screen.getAllByTestId("expense-card")[0];
        fireEvent.mouseEnter(expenseCard)
        fireEvent.mouseLeave(expenseCard)
    })
    test("should call edit button",()=>{
        render(<ExpenseTracker/>)
        const editButton=screen.getAllByTestId("edit-button")[0];
        userEvent.click(editButton)
        fireEvent.mouseEnter(editButton)
        fireEvent.mouseLeave(editButton)
    })
    test("should call delete button",()=>{
        render(<ExpenseTracker/>)
        const deleteButton=screen.getAllByTestId("delete-button")[0];
        userEvent.click(deleteButton)
        fireEvent.mouseEnter(deleteButton)
        expect(fireEvent.mouseLeave(deleteButton)).toBe(true)
    })
})
