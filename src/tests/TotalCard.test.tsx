import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalCard from '../components/TotalCard'; 

describe('TotalCard', () => {
  it('renders the label "Total Expenses"', () => {
    render(<TotalCard total={100} />);
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
  });

  it('renders the total amount with 2 decimal places', () => {
    render(<TotalCard total={123.456} />);
    expect(screen.getByText('$123.46')).toBeInTheDocument();
  });

  it('renders $0.00 for zero total', () => {
    render(<TotalCard total={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('renders large numbers correctly', () => {
    render(<TotalCard total={9999999.99} />);
    expect(screen.getByText('$9999999.99')).toBeInTheDocument();
  });

  it('renders negative numbers correctly', () => {
    render(<TotalCard total={-50.5} />);
    expect(screen.getByText('$-50.50')).toBeInTheDocument();
  });
});
