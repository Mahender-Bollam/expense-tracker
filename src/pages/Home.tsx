import React, { FC, useEffect, useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Expense } from "../types";
import { sampleExpenses } from "../data/sampleExpenses";

const store = "expense:expenses";

const Home: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const data = localStorage.getItem(store);
      if (data) return JSON.parse(data) as Expense[];
    } 
    catch {}
    return sampleExpenses;
  });

  const [editing, setEditing] = useState<Expense | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(store, JSON.stringify(expenses));
    } 
    catch {}
  }, [expenses]);

  const nextId = useMemo(() => {
    const max = expenses.reduce((acc, e) => (e.id > acc ? e.id : acc), 0);
    return max + 1;
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <section>
        <ExpenseForm onAdd={addExpense} nextId={nextId} />
      </section>

      <section style={{ marginTop: 16 }}>
        <ExpenseList items={expenses} onEdit={(it) => setEditing(it)} onDelete={deleteExpense} />
      </section>
    </div>
  );
};

export default Home;