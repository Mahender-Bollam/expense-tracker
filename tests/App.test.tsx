import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders expenseTracker Component', () => {
  render(<App />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
