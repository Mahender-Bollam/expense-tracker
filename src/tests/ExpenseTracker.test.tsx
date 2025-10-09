import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ExpenseTracker from "../components/ExpenseTracker";

describe("ExpenseTracker",()=>{
    test("should display text in document",()=>{
        render(<ExpenseTracker/>)
        expect(screen.getByText("Manage your daily expenses efficiently")).toBeInTheDocument()
    })
})