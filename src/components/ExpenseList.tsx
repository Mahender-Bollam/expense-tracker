import React, { FC } from "react";
import { Expense } from "../types";

type Props = {
  items: Expense[];
  onEdit: (item: Expense) => void;
  onDelete: (id: number) => void;
};

const ExpenseList: FC<Props> = ({ items, onEdit, onDelete }) => {
  if (!items.length) return <p className="empty">No expenses</p>;

  return (
    <ul className="expense-list">
      {items.map((it) => (
        <li key={it.id} className="expense-item">
          <div className="item-left">
            <div className="item-title">{it.title}</div>
            <div className="item-meta">₹{it.amount} • {it.date}</div>
          </div>

          <div className="item-actions">
            <button onClick={() => onEdit(it)}>Edit</button>

            <button
              onClick={() => {
                const confirmed = window.confirm(`Delete Expense"${it.title}"?`);
                if (confirmed) onDelete(it.id);
              }}
            >
              Delete Expense
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;