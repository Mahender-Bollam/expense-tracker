import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import ExpenseTracker from './App';
import userEvent from '@testing-library/user-event';

describe('Test cases for app component',()=>{
 
  test('renders Manage your daily expenses efficiently in the document', () => {
  render(<App />);
  const linkElement = screen.getByText(/Manage your daily expenses efficiently/i);
  expect(linkElement).toBeInTheDocument();
});

test("Should render expense trackor component",()=>{
  render(<ExpenseTracker />)
  const addExpenseButton = screen.getByRole('button',{name:'Add Expense'})
  userEvent.click(addExpenseButton)
})

test("Should call setHoveredButton on hoverleave",()=>{
  render(<ExpenseTracker />)
  const addExpenseButton = screen.getByRole('button',{name:'Add Expense'})
  fireEvent.mouseEnter(addExpenseButton)
  fireEvent.mouseLeave(addExpenseButton)
})
test("Should call setHoveredButton on hoverleave in remove button",()=>{
  render(<ExpenseTracker />)
  const removeExpense = screen.getAllByRole('Remove')[0]
  userEvent.click(removeExpense)
  fireEvent.mouseLeave(removeExpense)
  fireEvent.mouseEnter(removeExpense)
})

test("Should call setHoveredButton on hoverleave in edit button",()=>{
  render(<ExpenseTracker />)
  const removeExpense = screen.getAllByRole('edit')[0]
  userEvent.click(removeExpense)
  fireEvent.mouseLeave(removeExpense)
  fireEvent.mouseEnter(removeExpense)
  
})

})




