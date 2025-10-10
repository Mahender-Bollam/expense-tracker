import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders expense tracker', () => {
  render(<App />);
  expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
  expect(screen.getByText("Manage your daily expenses efficiently")).toBeInTheDocument()
  expect(screen.getByText("Recent Expenses")).toBeInTheDocument()
  expect(screen.getByText("Total Expenses")).toBeInTheDocument()
});

test('open add expense form', () => {
  render(<App />);
  fireEvent.click(screen.getByText("Add Expense"))
  expect(screen.getByText('Add New Expense')).toBeInTheDocument();
});

test('open edit expense form', () => {
  render(<App />);
  fireEvent.click(screen.getAllByTestId("expense-edit")[0])
  expect(screen.getByText('Edit Expense')).toBeInTheDocument();

  expect(screen.getByPlaceholderText("Enter description")).toHaveValue('Groceries')
  expect(screen.getByPlaceholderText("0.00")).toHaveValue(85.5)
  expect(screen.getByPlaceholderText("Enter date")).toHaveValue('2025-10-05')
  expect(screen.getByTestId("cateegoryid")).toHaveValue("Food")
});

test('delete expense', () => {
  render(<App />);
  fireEvent.click(screen.getAllByTestId("expense-delete")[0])
  expect(screen.queryByText('Biryani')).not.toBeInTheDocument();
});

test("show validations", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('add-expense'));
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.getByText("Please enter description")).toBeInTheDocument()
  expect(screen.getByText("Please enter positive amount")).toBeInTheDocument()
  expect(screen.getByText("Please select category")).toBeInTheDocument()
})

test('adds new expense', () => {
  render(<App />);
  fireEvent.click(screen.getAllByText('Add Expense')[0]);

  fireEvent.change(screen.getByPlaceholderText('Enter description'), {
    target: { value: 'Netflix Subscription' }
  });
  fireEvent.change(screen.getByPlaceholderText('0.00'), {
    target: { value: '15.99' }
  });
  fireEvent.change(screen.getByTestId('cateegoryid'), {
    target: { value: 'Entertainment' }
  });

  fireEvent.click(screen.getAllByText('Add Expense')[1]);

  expect(screen.getByText('Netflix Subscription')).toBeInTheDocument();
  expect(screen.getByText('$146.49')).toBeInTheDocument();
});

test("validation messages disappear on valid input", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId('add-expense'));
  fireEvent.click(screen.getByTestId('submit-button'));
  expect(screen.getByText('Please enter description')).toBeInTheDocument();
  expect(screen.getByText('Please enter positive amount')).toBeInTheDocument();
  expect(screen.getByText('Please select category')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'Test expense' } });
  expect(screen.queryByText('Please enter description')).not.toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '20' } });
  expect(screen.queryByText('Please enter positive amount')).not.toBeInTheDocument();
  fireEvent.change(screen.getByTestId('cateegoryid'), { target: { value: 'Food' } });
  expect(screen.queryByText('Please select category')).not.toBeInTheDocument();
});
