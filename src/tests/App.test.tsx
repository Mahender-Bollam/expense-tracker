import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the root component', () => {
  render(<App />);
  expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
});

