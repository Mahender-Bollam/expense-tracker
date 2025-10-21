import { render, screen } from "@testing-library/react"
import App from "../App";
jest.mock('../components/ExpenseTracker',()=>()=> {
    return <div data-testid="expense-tracker">Expense Tracker</div>});
test("should render expense tracker",()=>{
    render(<App/>);
    expect(screen.getByTestId('expense-tracker')).toBeInTheDocument();
})