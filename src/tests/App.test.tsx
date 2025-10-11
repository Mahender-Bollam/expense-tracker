import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('App Component',()=>{

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Expense Tracker/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText(/Manage your daily expenses efficiently/i)).toBeInTheDocument()
});

test('Should open the modal when clicked on Add expense',()=>{
  render(<App/>)
  const addBtn = screen.getByRole('button',{name: /Add Expense/i})
  userEvent.click(addBtn)
  expect(screen.getByPlaceholderText(/Enter description/i)).toBeInTheDocument()
})
test('Should test the hovering on add expense button',()=>{
  render(<App />)
  fireEvent.mouseLeave(screen.getByText(/Add Expense/i))
})

})


