import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { HoveredButton } from '../types/types';

const onAddClick = jest.fn();
const setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>> = jest.fn();

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderHeader = (hoveredButton: HoveredButton = null) => {
    return render(
      <Header
        onAddClick={onAddClick}
        hoveredButton={hoveredButton}
        setHoveredButton={setHoveredButton}
      />
    );
  };

  it('renders header with title and subtitle', () => {
    renderHeader();

    expect(screen.getByRole('heading', { name: /Expense Tracker/i })).toBeInTheDocument();
    expect(screen.getByText(/Manage your daily expenses efficiently/i)).toBeInTheDocument();
  });

  it('renders Add Expense button', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: /Add Expense/i })).toBeInTheDocument();
  });

  it('calls onAddClick when button is clicked', () => {
    renderHeader();

    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.click(addButton);

    expect(onAddClick).toHaveBeenCalledTimes(1);
  });

  it('calls setHoveredButton with "add" on mouse enter', () => {
    renderHeader();

    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.mouseEnter(addButton);

    expect(setHoveredButton).toHaveBeenCalledWith('add');
  });

  it('calls setHoveredButton with null on mouse leave', () => {
    renderHeader('add');

    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.mouseLeave(addButton);

    expect(setHoveredButton).toHaveBeenCalledWith(null);
  });

  it('adds hover class when hoveredButton is "add"', () => {
    renderHeader('add');

    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    expect(addButton).toHaveClass('addButtonHover');
  });

  it('does not add hover class when hoveredButton is null', () => {
    renderHeader(null);

    const addButton = screen.getByRole('button', { name: /Add Expense/i });
    expect(addButton).not.toHaveClass('addButtonHover');
  });
});