const API_URL = 'http://localhost:3000/api/expenses';

export const fetchAllExpenses = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createExpense = async (expense: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const modifyExpense = async (id: number, expense: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const removeExpense = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
