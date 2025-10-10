import React, { useState } from "react";
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

    const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const validateForm = (): boolean => {
    let newErrors = { description: "", amount: "", category: "", date: "" };
    let isValid = true;
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (): void => {
    if (!validateForm()) return;
    const expense: Expense = {
      id: editingId !== null ? editingId : Date.now(),
      description: formData.description.trim(),
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
  };

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
          style={{
            ...styles.input,
            borderColor: errors.description ? "red" : "#ccc",
          }}
          placeholder="Enter description"
        />
        {errors.description && <p style={{ color: "red", fontSize: 13 }}>{errors.description}</p>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Amount</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          style={{
            ...styles.input,
            borderColor: errors.amount ? "red" : "#ccc",
          }}
          placeholder="0.00"
        />
        {errors.amount && <p style={{ color: "red", fontSize: 13 }}>{errors.amount}</p>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{
            ...styles.input,
            borderColor: errors.category ? "red" : "#ccc",
          }}
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
          style={{
            ...styles.input,
            borderColor: errors.date ? "red" : "#ccc",
          }}
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
          onClick={handleSubmit}
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








