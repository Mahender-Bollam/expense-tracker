import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders  tittle element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Expense Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders description of page',()=>{
  render(<App/>);
  expect(screen.getByText(/Manage your daily expenses efficiently/i)).toBeInTheDocument();
})
