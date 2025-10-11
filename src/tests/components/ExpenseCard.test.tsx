import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseCard from '../../components/ExpenseCard';

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

const renderComponent = () =>{
    render(
            <ExpenseCard expenses={mockExpenses} setExpenses={mockSetExpenses} 
            hoveredButton={mockHoveredButton} setHoveredButton={mockSetHoveredButton} 
            setHoveredExpense={mockSetHoveredExpense} setFormData={mockSetFormData} setEditingId={mockSetEditingId} 
            setIsModalOpen={mockSetIsModalOpen} hoveredExpense={mockHoveredExpense}/>
        )
}

describe('Expense card component',()=>{
    test('Should render the expense card and able to click edit button',()=>{
        renderComponent();
        fireEvent.click(screen.getByTitle("Edit"))

    })
   
})



