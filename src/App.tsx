import React, { useEffect, useState } from "react";
import {
  Trash2,
  Edit2,
  Plus,
  DollarSign,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import { Expense } from "./interface/expense";
import { FormData } from "./interface/formData";
import { HoveredButton } from "./types/types";
import { HoveredExpense } from "./types/types";
import { ModalProps } from "./interface/modelProps";
import { styles } from "./styles/styles";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const ExpenseTracker: React.FC = () => {
  const handleModalData = async () => {
    if (editingId !== null) {

    await fetch(`http://localhost:3002/items/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        name: formData.description,
        cost: parseFloat(formData.amount),
        description: formData.category,
        date:formData.date
      }),
    });

    await getAllExpenses();
    closeModal();
  } 
  else{
     await fetch("http://localhost:3002/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       
        name: formData.description,
        cost: parseFloat(formData.amount),
        description: formData.category,
        date: new Date(formData.date).toISOString(),
      }),
    });

    await getAllExpenses(); 
    closeModal();
  }
  };

  const [expenses, setExpenses] = useState<Expense[]>([]);
  
const getAllExpenses = async () => {
  try {
    const response = await fetch("http://localhost:3002/items");
    const data = await response.json();

    const  ModifyData= data.map((expense: any) => ({

      id: expense.id,
      description: expense.name,
      amount: Number(expense.cost), 
      category: expense.description,
      date: expense.date

    }));

    setExpenses(ModifyData);
  } catch (error) {
    console.error("Failed to fetch Expenses:", error);
  }
};


  useEffect(()=>{
    getAllExpenses();
  } , [])


  const deleteExpense = async (id : number)=>{
    try{
      await fetch(`http://localhost:3002/items/${id}`, {
      method: "DELETE",
    });
    getAllExpenses();

    }
    catch(error){
      console.error("Expense is not deleted")
    }

  }


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

  const categories: string[] = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Health",
    "Other",
  ];

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

  const totalExpense: number = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

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
              onClick={() => setIsModalOpen(true)}
              style={{
                ...styles.addButton,
                ...(hoveredButton === "add" ? styles.addButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("add")}
              onMouseLeave={() => setHoveredButton(null)}>
              <Plus size={20} />
              Add Expense
            </button>
          </div>

          <div style={styles.totalCard}>
            <p style={styles.totalLabel}>Total Expenses</p>
            <p style={styles.totalAmount}>${totalExpense.toFixed(2)}</p>
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
                    ...(hoveredExpense === expense.id
                      ? styles.expenseItemHover
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredExpense(expense.id)}
                  onMouseLeave={() => setHoveredExpense(null)}>
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
                      ${expense.amount.toFixed(2)}
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
                        title="Edit">
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => {
                          deleteExpense(expense.id);
                          alert(
                            "Are you sure you want to delete this expensive"
                          );
                        }}
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
                        title="Delete">
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {editingId ? "Edit Expense" : "Add New Expense"}
          </h2>
          <button
            onClick={closeModal}
            style={{
              ...styles.closeButton,
              ...(hoveredButton === "close" ? styles.closeButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton("close")}
            onMouseLeave={() => setHoveredButton(null)}>
            <X size={24} />
          </button>
        </div>

        <div
          style={styles.formGroup}
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormData({ ...formData, category: e.target.value })
            }
            style={styles.input}>
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} data-testid="date">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, date: e.target.value })
            }
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={handleModalData}
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === "submit" ? styles.primaryButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton("submit")}
            onMouseLeave={() => setHoveredButton(null)}>
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
          <button
            onClick={closeModal}
            style={{
              ...styles.secondaryButton,
              ...(hoveredButton === "cancel"
                ? styles.secondaryButtonHover
                : {}),
            }}
            onMouseEnter={() => setHoveredButton("cancel")}
            onMouseLeave={() => setHoveredButton(null)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseTracker;
