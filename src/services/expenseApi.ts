export const API_BASE_URL = "http://localhost:5000/expenses";

export async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.message || res.statusText || "Unknown error";
    throw new Error(errorMessage);
  }
  return res.json();
}
export const getExpenses = async () => {
  const res = await fetch(API_BASE_URL);
  return handleResponse(res);
};
export const addExpense = async (expense: { description: string; amount: number; category: string; date: string }) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return handleResponse(res);
};

export const updateExpense = async (id: string, updatedData: any) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return handleResponse(res);
};
export const deleteExpense = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};
