const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/expenses';

async function handleResponse(res: Response) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } 
  catch (e) {
    throw new Error(`Invalid JSON response: ${text}`);
  }
  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}

export const getAllExpenses = async () => {
  const res = await fetch(API);
  return handleResponse(res);
};

export const getExpenseById = async (id: string) => {
  const res = await fetch(`${API}/${id}`);
  return handleResponse(res);
};

export const createExpense = async (data: {
  title: string;
  amount: number;
  category: string;
  date: string;
}) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateExpense = async (id: string, data: {
  title: string;
  amount: number;
  category: string;
  date: string;
}) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const patchExpense = async (id: string, data: Partial<{
  title: string;
  amount: number;
  category: string;
  date: string;
}>) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteExpense = async (id: string) => {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
};
