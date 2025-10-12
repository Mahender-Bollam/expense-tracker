import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  test('renders the ExpenseTracker component', () => {
    render(<App />);
    expect(screen.getByText(/Expense Tracker/i)).toBeInTheDocument();
  });

});
