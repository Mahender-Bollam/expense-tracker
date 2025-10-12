import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe("Expense tracker" ,() =>{
  it("Should render header correctly",() => {
    render(
      <App/>
    );
    const title = screen.getByText("Expense Tracker");
    const addButton = screen.getByRole('button' ,{name:"Add Expense"} )
    expect(addButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })
  it("Should add new expense", () => {
    render(
      <App/>
    );
    const addButton = screen.getByTestId('open-model');
    fireEvent.click(addButton);
    const desccription = screen.getByPlaceholderText("Enter description");
    const amount = screen.getByPlaceholderText("0.00");
    const category = screen.getByDisplayValue("Select category");
    const date = screen.getByLabelText("Date");
    fireEvent.change(desccription,{target : {value:"Pizza"}});
    fireEvent.change(amount,{target : {value:"20"}});
    fireEvent.change(category,{target : {value:"Food"}});
    fireEvent.change(date,{target : {value:"2025-10-10"}});
    const button = screen.getByTestId('add-expense');
    fireEvent.click(button);
    const expense =screen.getByText("Pizza");
    expect(expense).toBeInTheDocument();
  })
  it("Should throw errors on empty fields", () =>{
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
     render(
      <App/>
    );
    const addButton = screen.getByTestId('open-model');
    fireEvent.click(addButton);
    const desccription = screen.getByPlaceholderText("Enter description");
    const amount = screen.getByPlaceholderText("0.00");
    const category = screen.getByDisplayValue("Select category");
    const date = screen.getByLabelText("Date");
    fireEvent.change(desccription,{target : {value:""}});
    fireEvent.change(amount,{target : {value:"20"}});
    fireEvent.change(category,{target : {value:"Food"}});
    fireEvent.change(date,{target : {value:"2025-10-10"}});
    const button = screen.getByTestId('add-expense');
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalled();
  })
})