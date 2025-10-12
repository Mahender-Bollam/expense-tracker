import { render,screen } from "@testing-library/react"
import ExpenseTracker from "../App"
import userEvent from "@testing-library/user-event"



describe('ExpenseCart.tsx module test-suit',()=>{
    test("should render the predefined 'Gas' expense while rendering",()=>{
        render(
            <ExpenseTracker/>
        );
        userEvent.unhover(screen.getAllByTestId('expenseCardId').at(-1) as HTMLElement);
        expect(screen.getByText('Gas')).toBeInTheDocument();
    });
})