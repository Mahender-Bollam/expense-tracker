import { render, screen } from "@testing-library/react"
import ExpenseTracker from "../App"
import userEvent from "@testing-library/user-event";



jest.spyOn(window,'alert')
describe('Button.tsx component test-suit',()=>{
    afterEach(()=>{
        jest.clearAllMocks()
    })
    test(`should open the Modal compenent and have 'Add New Expense' in the screen when user click on 'Add Expense' button`,()=>{
        render(
            <ExpenseTracker/>                    
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)
        expect(screen.getByText('Add New Expense')).toBeInTheDocument();
    });

    test(`should open the Modal compenent and have 'Add New Expense' in the screen and close the Modal component when user click on 'Cancel' button`,()=>{
        render(
            <ExpenseTracker/>                    
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)
        expect(screen.getByText('Add New Expense')).toBeInTheDocument();

        const closeModalButton = screen.getByRole('button',{name:'Cancel'});
        userEvent.click(closeModalButton);
        expect(closeModalButton).not.toBeInTheDocument();
        
    });

    test(`should open the Modal compenent and have 'Add New Expense' in the screen and close the Modal component when user click on 'Cancel' button`,()=>{
        render(
            <ExpenseTracker/>                    
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)
        expect(screen.getByText('Add New Expense')).toBeInTheDocument();

        const closeModalButton = screen.getByRole('button',{name:'Cancel'});
        userEvent.click(closeModalButton);
        expect(closeModalButton).not.toBeInTheDocument();
        
    });

    test(`should open the Modal component for the Gas expense and document should have 'Gas' expense in it `,()=>{
        render(
            <ExpenseTracker/>  
        );
        const openModalToEditButton = screen.getAllByTestId('editExpenseId').at(-1) as HTMLElement;
        userEvent.click(openModalToEditButton)
        expect(screen.getByText('Gas')).toBeInTheDocument();
        
    });

    test(`should display the alert popup when an expense is deleted`,()=>{
        
        render(
            <ExpenseTracker/>  
        );
        const deleteAnExpenseButton = screen.getAllByTestId('deleteExpenseId').at(-1) as HTMLElement;
        userEvent.click(deleteAnExpenseButton)
        expect(window.alert).toHaveBeenCalledWith('The expense with description Gas will be deleted')
        
    });
    test(`should display 'No expenses yet. Add your first expense above!' message whel all the expenses were deleted`,()=>{
        
        render(
            <ExpenseTracker/>  
        );
        const deleteAnExpenseButton = screen.getAllByTestId('deleteExpenseId') ;
        userEvent.click(deleteAnExpenseButton.at(1)as HTMLElement)
        expect(window.alert).toHaveBeenCalledWith('The expense with description Gas will be deleted')
        userEvent.click(deleteAnExpenseButton.at(0)as HTMLElement)
        expect(window.alert).toHaveBeenCalledWith('The expense with description Groceries will be deleted')
        expect(screen.getByText('No expenses yet. Add your first expense above!')).toBeInTheDocument();
        
    });

    test('should perform user event unhover over the button which opens the modal and have id "openModalButtonId" ',()=>{
        render(
            <ExpenseTracker/>
        )
        userEvent.unhover(screen.getAllByTestId('openModalButtonId').at(-1) as HTMLElement);
    });

    test('should perform user event unhover over the button which opens the modal and have id "editExpenseId" ',()=>{
        render(
            <ExpenseTracker/>
        )
        userEvent.unhover(screen.getAllByTestId('editExpenseId').at(-1) as HTMLElement);
    });

    test(`should open the Modal compenent  when user click button with id 'addExpenseId' to add an invalid an alert should popup`,()=>{
        render(
            <ExpenseTracker/>                    
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)

        const addExpense = screen.getByTestId('addExpenseId') ;
        userEvent.click(addExpense)
        expect(window.alert).toHaveBeenCalled()
    });

    test(`should perform user event unhover over the button which opens the modal and have id "addExpenseId" `,()=>{
        render(
            <ExpenseTracker/>                    
        );
        const openModalButton = screen.getByRole('button',{name:'Add Expense'})
        userEvent.click(openModalButton)

        const openModalButton1 = screen.getByTestId('addExpenseId') ;
        userEvent.unhover(openModalButton1);
    });

    

})