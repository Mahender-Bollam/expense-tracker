import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseTracker from '../components/ExpenseTracker';

test('renders ExpenseTracker component', () => {
  render(<ExpenseTracker />);
});
