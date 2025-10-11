import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ExpenseTracker from './App';
import userEvent from '@testing-library/user-event';

test('renders  tittle element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Expense Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders description of page',()=>{
  render(<App/>);
  expect(screen.getByText(/Manage your daily expenses efficiently/i)).toBeInTheDocument();
})
test(' display the total amount correctly', () => {
    render(<App />);
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('$130.50')).toBeInTheDocument(); 
  });

test('closes modal when "Close Modal" button is clicked',() => {
  render(<App />);
  userEvent.click(screen.getByText(/Add Expense/i));
  userEvent.click(screen.getByRole('button', { name: /close modal/i }));
  expect(screen.queryByText(/Add New Expense/i)).not.toBeInTheDocument();
});

  