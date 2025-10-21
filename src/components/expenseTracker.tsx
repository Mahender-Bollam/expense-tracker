import React, { useEffect, useState } from "react";
import { DollarSign, Plus } from "lucide-react";
import { styles } from "../styles/tracker.styles";
import { Expense } from "../interface/expense";
import { HoveredButton, HoveredExpense } from "../types/types";
import ExpenseForm from "./expenseForm";
import Modal from "./modal";
import ExpenseList from "./expenseList";
import { FormData } from "../interface/formData";
import axios from "axios";

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [formData, setFormData] = useState<FormData>({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<HoveredButton>(null);
  const [hoveredExpense, setHoveredExpense] = useState<HoveredExpense>(null);

  const categories: string[] = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Health", "Other"];
  
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axios.get("http://localhost:3010/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpense();
  }, []);

  
  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };
  const handleAdd = (): void => {
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setIsModalOpen(true);
  };
  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
  const confirmed = window.confirm("You want to delete this expense?");
  if (!confirmed) return;
  try {
    await axios.delete(`http://localhost:3010/expenses/${id}`);
    const res = await axios.get("http://localhost:3010/expenses");
    setExpenses(res.data);
  } catch (err) {
    console.error("Error deleting expense:", err);
  }
};

  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.title}>
                <DollarSign color="6366F1_1" size={32} />
                Expense Tracker
              </h1>
              <p style={styles.subtitle}>Manage your daily expenses efficiently</p>
            </div>
            <div style={styles.actionButtons}>
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
          </div>
          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>${totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <ExpenseList
          expenses={expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          hoveredButton={hoveredButton}
          setHoveredButton={setHoveredButton}
          hoveredExpense={hoveredExpense}
          setHoveredExpense={setHoveredExpense}
          styles={styles}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ExpenseForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          editingId={editingId}
          setExpenses={setExpenses}
          expenses={expenses}
          closeModal={closeModal}
          hoveredButton={hoveredButton}
          setHoveredButton={setHoveredButton}
          styles={styles}
        />
      </Modal>
    </div>
  );
};
export default ExpenseTracker;