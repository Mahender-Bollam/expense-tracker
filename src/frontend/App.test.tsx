import { render, screen, waitFor } from "@testing-library/react"
import ExpenseTracker from "./App"
import userEvent from "@testing-library/user-event";

jest.spyOn(window,"alert")
describe('App.tsx module remaining test-suit',()=>{
    test("should display alert when user endterd the future date as expense",async()=>{
        render(
            <ExpenseTracker/>
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)
        expect(screen.getByText('Add New Expense')).toBeInTheDocument();
        
        userEvent.type(screen.getByPlaceholderText('Enter description'),'Woodland shoes');
        userEvent.type(screen.getByPlaceholderText('0.00'),'1000');
        userEvent.selectOptions(screen.getByRole("combobox"), "Shopping")
        userEvent.type(screen.getAllByRole('textbox').at(-1) as HTMLElement,`3000-12-31`);
        

        await waitFor (()=>{
            const addExpenseButton = screen.getAllByRole('button',{name:'Add Expense'}).at(-1) as HTMLElement
            userEvent.click(addExpenseButton)
            expect(window.alert).toHaveBeenCalled();
        })
    })

    test("should 'Update Expense' appear while editing an expense and after user click the button then the button should dissappear from the document",async()=>{
        render(
            <ExpenseTracker/>
        );
        
        const openModalToEditExpenseButton = screen.getAllByTestId('editExpenseId').at(-1) as HTMLElement;
        userEvent.click(openModalToEditExpenseButton)
        expect(screen.getByText('Gas')).toBeInTheDocument();

        const updateExpenseButton = screen.getAllByRole('button',{name:'Update Expense'}).at(-1) as HTMLElement;
        await waitFor (()=>{
            userEvent.click(updateExpenseButton);
        })
        expect(updateExpenseButton).not.toBeInTheDocument();

    });

})