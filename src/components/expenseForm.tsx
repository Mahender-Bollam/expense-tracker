import React from "react";
import { X } from "lucide-react";
import { Expense } from "../interface/expense";
import { FormData } from "./expenseTracker";

interface ExpenseFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  categories: string[];
  editingId: number | null;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  expenses: Expense[];
  closeModal: () => void;
  hoveredButton: string | null;
  setHoveredButton: (btn: string | null) => void;
  styles: any;
}
const ExpenseForm: React.FC<ExpenseFormProps> = ({
  formData,
  setFormData,
  categories,
  editingId,
  setExpenses,
  expenses,
  closeModal,
  hoveredButton,
  setHoveredButton,
  styles,
}) => {
  return (
    <>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>{editingId ? "Edit Expense" : "Add New Expense"}</h2>
        <button
          onClick={closeModal}
          style={{
            ...styles.closeButton,
            ...(hoveredButton === "close" ? styles.closeButtonHover : {}),
          }}
          onMouseEnter={() => setHoveredButton("close")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <X size={24} />
        </button>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={styles.input}
          placeholder="Enter description"
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Amount</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          style={styles.input}
          placeholder="0.00"
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={styles.input}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.primaryButton,
            ...(hoveredButton === "submit" ? styles.primaryButtonHover : {}),
          }}
          onMouseEnter={() => setHoveredButton("submit")}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => {
            if (!formData.description || !formData.amount || !formData.category) {
              alert("Please fill all fields!");
              return;
            }
            const expense: Expense = {
              id: editingId !== null ? editingId : Date.now(),
              description: formData.description,
              amount: parseFloat(formData.amount),
              category: formData.category,
              date: formData.date,
            };
            if (editingId !== null) {
              setExpenses(expenses.map((exp) => (exp.id === editingId ? expense : exp)));
            } else {
              setExpenses([...expenses, expense]);
            }
            closeModal();
          }}
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
        <button
          onClick={closeModal}
          style={{
            ...styles.secondaryButton,
            ...(hoveredButton === "cancel" ? styles.secondaryButtonHover : {}),
          }}
          onMouseEnter={() => setHoveredButton("cancel")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
export default ExpenseForm;