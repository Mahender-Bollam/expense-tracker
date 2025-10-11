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


})


