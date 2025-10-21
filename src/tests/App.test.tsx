import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';



describe('Applitesting',()=>{
  let handleAdd : jest.Mock
  handleAdd = jest.fn()
  let handleRemove : jest.Mock
  handleAdd = jest.fn()

  
  test('renders the root component, and display header test', () => {
    render(<App />);
    expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
  });

  test('When I click a button it should open',()=>{
    render(<App/>);
    expect(screen.getByRole("button", { name: "Add Expense" })).toBeInTheDocument();
  })
  test('When I click a button it should clicked',()=>{
    render(<App/>);
    const buttonClick = screen.getByRole("button", { name: "Add Expense" });
    userEvent.click(buttonClick)
  })
    test('When I click a button the functionality',()=>{
    render(<App/>);
    const buttonClick = screen.getByRole("button", { name: "Add Expense" });
    userEvent.click(buttonClick)
  })
    test('When I click a handle add button that will hover',()=>{
    render(<App/>);
    const buttonClicked = screen.getByRole("button", { name: "Add Expense" });
    userEvent.click(buttonClicked)
    fireEvent.mouseEnter(buttonClicked)
    fireEvent.mouseLeave(buttonClicked)

  })
    test('When I click a handle edit button that will hover',()=>{
    render(<App/>);
    const buttonClicked = screen.getAllByTestId("edit-button")[0];
    userEvent.click(buttonClicked)
    fireEvent.mouseEnter(buttonClicked)
    fireEvent.mouseLeave(buttonClicked)
  })
    test('When I click a handle remove button that will hover',()=>{
    render(<App/>);
    const buttonClicked = screen.getAllByTestId("remove-button")[0];
    userEvent.click(buttonClicked)
    fireEvent.mouseEnter(buttonClicked)
    fireEvent.mouseLeave(buttonClicked)
  })

  test('When I click a delete button it show a remove alert',()=>{
    const alertMock = jest.spyOn(window,'alert');
     render(<App/>);
     const removeButton = screen.getAllByTestId('remove-button')
     userEvent.click(removeButton[0]);
     expect(alertMock).toHaveBeenCalledWith('Are you delete the expense')
     expect(alertMock).toHaveBeenCalledTimes(1)
     
  })
  

})



