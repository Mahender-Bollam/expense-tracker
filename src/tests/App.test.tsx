import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';
import ExpenseTracker from '../App';
import userEvent from '@testing-library/user-event';

describe('Test cases for app component', () => {

	test('renders Manage your daily expenses efficiently in the document', () => {
		render(<App />);
		const linkElement = screen.getByText(/Manage your daily expenses efficiently/i);
		expect(linkElement).toBeInTheDocument();
	});

	test("Should render expense trackor component", () => {
		render(<ExpenseTracker />)
		const addExpenseButton = screen.getByRole('button', { name: 'Add Expense' })
		userEvent.click(addExpenseButton)
	})

	test("Should call setHoveredButton on hoverleave", () => {
		render(<ExpenseTracker />)
		const addExpenseButton = screen.getByRole('button', { name: 'Add Expense' })
		fireEvent.mouseEnter(addExpenseButton)
		fireEvent.mouseLeave(addExpenseButton)
	})
	test("Should call setHoveredButton on hoverleave in remove button", () => {
		render(<ExpenseTracker />)
		const removeExpenses = screen.getAllByTestId('remove')[0]
		fireEvent.click(removeExpenses)
		fireEvent.mouseLeave(removeExpenses)
		fireEvent.mouseEnter(removeExpenses)

	})

	test("Should call setHoveredButton on hoverleave in edit button", () => {
		render(<ExpenseTracker />)
		const editExpense = screen.getAllByTestId('edit')[0]
		userEvent.click(editExpense)
		fireEvent.mouseLeave(editExpense)
		fireEvent.mouseEnter(editExpense)

	})

	test('should proceed with the action when the user confirms', async () => {
		const user = userEvent.setup();
		jest.spyOn(window, 'confirm').mockImplementation(() => true);
		const alertMock = jest.spyOn(window, 'alert');
		render(<ExpenseTracker />);
		const actionButton = screen.getAllByTestId('remove')[0]
		await user.click(actionButton);
		expect(window.confirm).toHaveBeenCalledTimes(1);
		expect(window.confirm).toHaveBeenCalledWith('Are you sure , do you want remove this expense');
		expect(alertMock).toHaveBeenCalledTimes(1)
	});

	test("should update an expense correctly", async () => {
		const user = userEvent.setup();
		render(<ExpenseTracker />);

		const editButtons = screen.getAllByTestId('edit');
		await user.click(editButtons[0]);
		const descriptionInput = screen.getByLabelText(/description/i);
		await user.clear(descriptionInput);
		await user.type(descriptionInput, "Updated description");
		const amountInput = screen.getByLabelText(/amount/i);
		await user.clear(amountInput);
		await user.type(amountInput, "99");
		const categorySelect = screen.getByLabelText(/category/i);
		await user.selectOptions(categorySelect, "Transport");
		const updateBtn = screen.getByRole('button', { name: /update expense/i });
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
		await user.click(updateBtn);
		expect(alertMock).toHaveBeenCalledWith('Expense updated successfully.');

	});


	test("should add a new expense correctly", async () => {
		const user = userEvent.setup();
		render(<ExpenseTracker />);
		const addButton = screen.getByRole("button", { name: /add expense/i });
		user.click(addButton);
		const modal = await screen.findByRole("dialog");

		await user.type(within(modal).getByLabelText(/description/i), "Dinner");
		await user.type(within(modal).getByLabelText(/amount/i), "25.50");
		await user.selectOptions(within(modal).getByLabelText(/category/i), "Food");
		await user.type(within(modal).getByLabelText(/date/i), "2025-10-10");
		const submitBtn = within(modal).getByRole("button", { name: /add expense/i });
		await user.click(submitBtn);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(screen.getByText("Dinner")).toBeInTheDocument();
	});

	test("should close the modal when Cancel button is clicked", async () => {
		const user = userEvent.setup();
		render(<ExpenseTracker />);
		const addExpenseBtn = screen.getByRole("button", { name: /add expense/i });
		await user.click(addExpenseBtn);
		const modal = await screen.findByRole("dialog");
		expect(modal).toBeInTheDocument();
		const cancelButton = screen.getByRole("button", { name: /cancel/i });
		await user.click(cancelButton);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("should show alert message correctly", async () => {
		const user = userEvent.setup();
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

		render(<ExpenseTracker />);

		const editButtons = screen.getAllByTestId('edit');
		await user.click(editButtons[0]);
		const descriptionInput = screen.getByLabelText(/description/i);
		await user.clear(descriptionInput);
		const categorySelect = screen.getByLabelText(/category/i);
		await user.selectOptions(categorySelect, "");
		const updateBtn = screen.getByRole('button', { name: /update expense/i });
		await user.click(updateBtn);
		expect(alertMock).toHaveBeenCalledWith('Please fill all fields');
		alertMock.mockRestore();
	});

	test("should show alert if amount is not a number", async () => {
		const user = userEvent.setup();
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
		render(<ExpenseTracker />);
		const addButton = screen.getByRole("button", { name: /add expense/i });
		await user.click(addButton);
		const modal = screen.getByRole("dialog");
		const descriptionInput = screen.getByLabelText(/description/i);
		await user.clear(descriptionInput);
		await user.type(descriptionInput, "Updated description");
		const categorySelect = screen.getByLabelText(/category/i);
		await user.selectOptions(categorySelect, "Transport");
		const amountInput = within(modal).getByLabelText(/amount/i);
		await user.clear(amountInput);
		await user.type(amountInput, "0");
		const submitBtn = within(modal).getByRole("button", { name: /add expense/i });
		await user.click(submitBtn);
		expect(alertMock).toHaveBeenCalledWith("Amount should be greater than 0");
		alertMock.mockRestore();
	});


	test("should show alert message correctly when adding an expense", async () => {
		const user = userEvent.setup();
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
		render(<ExpenseTracker />);
		const addButton = screen.getByRole("button", { name: /add expense/i });
		await user.click(addButton);
		const modal = screen.getByRole("dialog");
		const amountInput = within(modal).getByLabelText(/amount/i);
		await user.clear(amountInput);
		await user.type(amountInput, "8");
		const submitBtn = within(modal).getByRole("button", { name: /add expense/i });
		await user.click(submitBtn);
		expect(alertMock).toHaveBeenCalledWith('Please fill all fields');
		alertMock.mockRestore();
	});

	test("should show alert message when amount is 0 or leass than 0", async () => {
		const user = userEvent.setup();
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

		render(<ExpenseTracker />);

		const editButtons = screen.getAllByTestId('edit');
		await user.click(editButtons[0]);
		const descriptionInput = screen.getByLabelText(/description/i);
		await user.type(descriptionInput, "Updated description");
		const amountInput = screen.getByLabelText(/amount/i);
		await user.clear(amountInput);
		await user.type(amountInput, "0");
		const categorySelect = screen.getByLabelText(/category/i);
		await user.selectOptions(categorySelect, "Transport");
		const updateBtn = screen.getByRole('button', { name: /update expense/i });
		await user.click(updateBtn);
		expect(alertMock).toHaveBeenCalledWith('Amount should be greater than 0');
		alertMock.mockRestore();
	});

})




