import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseCard from '../../components/ExpenseCard';

test('Should display no expenses when expenses is empty',()=>{
    render(
            <ExpenseCard expenses={[]} setExpenses={mockSetExpenses} 
            hoveredButton={mockHoveredButton} setHoveredButton={mockSetHoveredButton} 
            setHoveredExpense={mockSetHoveredExpense} setFormData={mockSetFormData} setEditingId={mockSetEditingId} 
            setIsModalOpen={mockSetIsModalOpen} hoveredExpense={mockHoveredExpense}/>
        )
    expect(screen.getByText(/No expenses yet. Add your first expense above!/i)).toBeInTheDocument()

})

const mockExpenses = [ { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' }]

const mockSetExpenses = jest.fn()
const mockHoveredButton = ''
const mockSetHoveredButton = jest.fn()
const mockHoveredExpense = null
const mockSetFormData = jest.fn()
const mockSetEditingId = jest.fn()
const mockSetIsModalOpen=jest.fn()
const mockSetHoveredExpense = jest.fn()

window.alert = jest.fn()

const renderComponent = (props={}) =>{
    render(
            <ExpenseCard expenses={mockExpenses} setExpenses={mockSetExpenses} 
            hoveredButton={mockHoveredButton} setHoveredButton={mockSetHoveredButton} 
            setHoveredExpense={mockSetHoveredExpense} setFormData={mockSetFormData} setEditingId={mockSetEditingId} 
            setIsModalOpen={mockSetIsModalOpen} hoveredExpense={mockHoveredExpense} {...props}/>
        )
}

describe('Expense card component',()=>{
    test('Should render the expense card and able to click edit button',()=>{
        renderComponent();
        fireEvent.click(screen.getByTitle("Edit"))

    })
    test('Should display alert when deleting the expense',()=>{
        renderComponent();
        fireEvent.click(screen.getByTitle('Delete'))
        jest.spyOn(window, 'alert').mockImplementation(() => {});

    })
    test('Should handle the mouse event when hover on edit button',()=>{
        renderComponent();
        fireEvent.mouseEnter(screen.getByTitle(/Edit/i))
        fireEvent.mouseLeave(screen.getByTitle(/Edit/i))
    })
    test('Should handle the mouse event when hover on delete button',()=>{
        renderComponent();
        fireEvent.mouseEnter(screen.getByTitle(/Delete/i))
        fireEvent.mouseLeave(screen.getByTitle(/Delete/i))
    })
    test('Should hover the expense card block when mouse entered on it',()=>{
        renderComponent({hoveredExpense:mockExpenses[0].id});
        fireEvent.mouseEnter(screen.getByTestId(/expense-block-hover/i))
        fireEvent.mouseLeave(screen.getByTestId(/expense-block-hover/i))
    })
    test('Should handle mouse hover on edit',()=>{
        renderComponent({hoveredButton:mockExpenses[0].id})
        fireEvent.mouseEnter(screen.getByTestId(/edit-button-hover/i))
        fireEvent.mouseLeave(screen.getByTestId(/edit-button-hover/i))
    })
})



