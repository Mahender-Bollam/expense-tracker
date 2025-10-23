import {
  API_BASE_URL,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  handleResponse,
} from '../services/expenseApi';

import fetchMock from 'jest-fetch-mock';

const mockExpense = {
  id: 'id123',
  description: 'Groceries',
  amount: 50.00,
  category: 'Food',
  date: '2025-10-21',
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('handleResponse', () => {
  test('should return JSON data for a successful response', async () => {
    const mockResponse = { data: 'success' };
    const res = new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await handleResponse(res);
    expect(result).toEqual(mockResponse);
  });

  test('should throw an error for a failed response with a message', async () => {
    const mockErrorData = { message: 'Not found' };
    const res = new Response(JSON.stringify(mockErrorData), {
      status: 404,
      statusText: 'Not Found',
      headers: { 'Content-Type': 'application/json' },
    });
    await expect(handleResponse(res)).rejects.toThrow('Not found');
  });

  test('should throw an error using statusText when no message is present', async () => {
    const res = new Response('{}', {
      status: 500,
      statusText: 'Internal Server Error',
      headers: { 'Content-Type': 'application/json' },
    });
    await expect(handleResponse(res)).rejects.toThrow('Internal Server Error');
  });
});

describe('getExpenses', () => {
  test('should fetch expenses successfully', async () => {
    const mockExpenses = [mockExpense];
    fetchMock.mockResponseOnce(JSON.stringify(mockExpenses), { status: 200 });
    const expenses = await getExpenses();
    expect(expenses).toEqual(mockExpenses);
    expect(fetchMock).toHaveBeenCalledWith(API_BASE_URL);
  });

  test('should throw an error when fetching expenses fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Network error' }), { status: 500 });
    await expect(getExpenses()).rejects.toThrow('Network error');
  });
});

describe('addExpense', () => {
  test('should add a new expense successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExpense), { status: 201 });
    const newExpense = await addExpense(mockExpense);
    expect(newExpense).toEqual(mockExpense);
    expect(fetchMock).toHaveBeenCalledWith(API_BASE_URL, expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockExpense),
    }));
  });

  test('should throw an error when adding an expense fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Validation failed' }), { status: 400 });
    await expect(addExpense(mockExpense)).rejects.toThrow('Validation failed');
  });
});

describe('updateExpense', () => {
  const updatedData = { ...mockExpense, description: 'New Groceries' };
  const expenseId = mockExpense.id;

  test('should update an expense successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(updatedData), { status: 200 });
    const updatedExpense = await updateExpense(expenseId, updatedData);
    expect(updatedExpense).toEqual(updatedData);
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/${expenseId}`, expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(updatedData),
    }));
  });

  test('should throw an error when updating an expense fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Not found' }), { status: 404 });
    await expect(updateExpense(expenseId, updatedData)).rejects.toThrow('Not found');
  });
});

describe('deleteExpense', () => {
  const expenseId = mockExpense.id;

  test('should delete an expense successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), { status: 200 });
    const response = await deleteExpense(expenseId);
    expect(response).toEqual({ message: 'Success' });
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/${expenseId}`, expect.objectContaining({
      method: 'DELETE',
    }));
  });

  test('should throw an error when deleting an expense fails', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Not found' }), { status: 404 });
    await expect(deleteExpense(expenseId)).rejects.toThrow('Not found');
  });
});
