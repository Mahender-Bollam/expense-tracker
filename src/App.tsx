import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, DollarSign, Calendar, Tag } from "lucide-react";
import { Expense, FormData } from "./types/ExpenseDetails";
import ModalCard from "./components/Modal";
import { getExpenses } from "./backendConnection/api";

export type HoveredButton = string | null;
type HoveredExpense = number | null;

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    // { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
    // { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
  ]);

  const fetchExpenses = async () => {
    try {
      const expenses = await getExpenses();
      setExpenses(expenses);
    } catch (error) {
      alert("Failed to connect to server");
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    description: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
  });
  console.log(formData);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
    setEditingId(Number(expense.id));
    setIsModalOpen(true);
  };

  const totalExpense: number = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0,
  );

  const handleAdd = () => {
    setFormData({
      description: "",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleRemove = async (expenseId: number) => {
    alert("Are you delete the expense");
    setExpenses((removeExpense: Expense[]) =>
      removeExpense.filter((card) => card.id !== expenseId.toString()),
    );
    console.log("removed expense");
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign color="#6366f1" size={32} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>
                Manage your daily expenses efficiently
              </p>
            </div>
            <button
              onClick={handleAdd}
              style={{
                ...styles.addButton,
                ...(hoveredButton === "add" ? styles.addButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("add")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>
              {typeof totalExpense === "number"
                ? `$${totalExpense.toFixed(2)}`
                : "$0.00"}
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Recent Expenses</h2>

          {expenses.length === 0 ? (
            <p style={styles.emptyState}>
              No expenses yet. Add your first expense above!
            </p>
          ) : (
            <div style={styles.expenseList}>
              {expenses.map((expense: Expense) => (
                <div
                  key={expense.id}
                  style={{
                    ...styles.expenseItem,
                    ...(hoveredExpense === Number(expense.id)
                      ? styles.expenseItemHover
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredExpense(Number(expense.id))}
                  onMouseLeave={() => setHoveredExpense(null)}
                >
                  <div style={styles.expenseContent}>
                    <div style={styles.expenseTitleRow}>
                      <h3 style={styles.expenseTitle}>{expense.description}</h3>
                      <span style={styles.categoryBadge}>
                        <Tag size={12} />
                        {expense.category}
                      </span>
                    </div>
                    <div style={styles.expenseDate}>
                      <Calendar size={14} />
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div style={styles.expenseRight}>
                    <span style={styles.expenseAmount}>
                      ${Number(expense.amount).toFixed(2)}
                    </span>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(expense)}
                        style={{
                          ...styles.editButton,
                          ...(hoveredButton === `edit-${expense.id}`
                            ? styles.editButtonHover
                            : {}),
                        }}
                        onMouseEnter={() =>
                          setHoveredButton(`edit-${expense.id}`)
                        }
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Edit"
                        data-testid="edit-button"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleRemove(Number(expense.id))}
                        style={{
                          ...styles.deleteButton,
                          ...(hoveredButton === `delete-${expense.id}`
                            ? styles.deleteButtonHover
                            : {}),
                        }}
                        onMouseEnter={() =>
                          setHoveredButton(`delete-${expense.id}`)
                        }
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Delete"
                        data-testid="remove-button"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalCard
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        setHoveredButton={setHoveredButton}
        hoveredButton={hoveredButton}
        expenses={expenses}
        setExpenses={setExpenses}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ExpenseTracker;
