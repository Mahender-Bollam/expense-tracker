import React from 'react';
import { render, screen } from '@testing-library/react';
//import App from '../src/App';
import ExpenseTracker from '../src/ExpenseTracker';

it('renders expenseTracker Component', () => {
  render(<ExpenseTracker />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
