import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

test('correctly handles the expense form', async () => {
  render(<App />);
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
  fireEvent.click(screen.getAllByText(/Add Expense/i)[0]);  
  fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'Hyderbadbiryani' } });
  fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '250' } });
  fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Food' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-10-07' } });
  expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();
  fireEvent.click(screen.getAllByText(/Add Expense/i)[1]); 
  expect(alertMock).toHaveBeenCalledWith('Add Expense  successfull');
  expect(screen.getByText('Hyderbadbiryani')).toBeInTheDocument();

   

});

