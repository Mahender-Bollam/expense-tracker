import React, { FC, useState } from "react";
import { Expense } from "../types";

type Props = {
  onAdd: (expense: Expense) => void;
  nextId: number;
};

const ExpenseForm: FC<Props> = ({ onAdd, nextId }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [errors, setErrors] = 
  useState<{ title?: string; amount?: string; date?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!title.trim()) e.title = "Title is required";
    const n = Number(amount);

    if (!amount) e.amount = "Amount is required";

    else if (Number.isNaN(n) || n <= 0) e.amount = "Enter a positive number";
    
    if (!date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const newExpense: Expense = {
      id: nextId,
      title: title.trim(),
      amount: Number(amount),
      date,
    };

    onAdd(newExpense);

    setTitle("");
    setAmount("");
    setDate("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="field">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </div>

      <div className="field">
        <input
          name="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        {errors.amount && <div className="field-error">{errors.amount}</div>}
      </div>

      <div className="field">
        <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <div className="field-error">{errors.date}</div>}
      </div>

      <div className="actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;