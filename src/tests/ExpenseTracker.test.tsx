
import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import ExpenseList from "../components/ExpenseList";
import { Expense, HoveredButton, HoveredExpense,FormData } from "../types/types";
import TotalCard from "../components/TotalCard";
import ExpenseModal from "../components/ExpenseModal"
import Header from "../components/Header"
 const expenses:Expense[]=[
   { id: 1, description: 'Groceries', amount: 85.5, category: 'Food', date: '2025-10-05' },
    { id: 2, description: 'Gas', amount: 85.5, category: 'Food', date: '2025-10-05' }]

const mockSetHoveredExpense: React.Dispatch<React.SetStateAction<HoveredExpense>> = jest.fn();
const mockSetHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>> = jest.fn();
const mockOnDelete: (id: number) => void = jest.fn();
const mockOnEdit: (expense: Expense) => void = jest.fn();
const mockOnAdd:()=>void=
     jest.fn();

const total:number=0;
const mockFormData: FormData = {
  description: 'Dinner',
  amount: '30.00',
  category: 'Food',
  date: '2025-10-10'
};

const mockCategories = ['Food', 'Transport', 'Utilities'];
const mockOnClose = jest.fn();
const mockSetFormData: React.Dispatch<React.SetStateAction<FormData>> = jest.fn();
const mockOnSubmit = jest.fn();
describe("ExpenseList Component", () => {
  it("renders ExpenseList without errors", () => {
   render(<ExpenseList expenses={expenses} hoveredExpense={null} setHoveredExpense={mockSetHoveredExpense} hoveredButton={null} setHoveredButton={mockSetHoveredButton} onDelete={mockOnDelete} onEdit={mockOnEdit}/>)
  });
  it("renders TotalCard without errors",()=>{
     render(<TotalCard  total={total} />)
  });
  it("renders Header without errors",()=>{
     render(<Header onAddClick={mockOnAdd} hoveredButton={null} setHoveredButton={mockSetHoveredButton}   />)
  });
  it("renders ExpenseModal without errors", () => {
    render(
      <ExpenseModal
        isOpen={true}
        onClose={mockOnClose}
        formData={mockFormData}
        setFormData={mockSetFormData}
        categories={mockCategories}
        onSubmit={mockOnSubmit}
        hoveredButton={null}
        setHoveredButton={mockSetHoveredButton}
        editingId={null} 
      />

    );
});
});