import React, { useState } from 'react';
import { X } from 'lucide-react';
import { styles } from '../../styles';
import { FormData, CATEGORIES } from '../../types/expense';
import { validateExpense } from '../../utils/validations';

interface ExpenseFormProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  isEditing
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleSubmitClick = () => {
    const result = validateExpense(formData);
    if (!result.isValid) {
      alert(result.message);
      return;
    }
    onSubmit();
  };

  return (
    <>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>
          {isEditing ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <button
          onClick={onCancel}
          style={{
            ...styles.closeButton,
            ...(hoveredButton === 'close' ? styles.closeButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('close')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <X size={24} />
        </button>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <input
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
          style={styles.input}
          placeholder="Enter description"
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="amount" style={styles.label}>Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => onFormChange({ ...formData, amount: e.target.value })}
          style={styles.input}
          placeholder="0.00"
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="category" style={styles.label}>Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => onFormChange({ ...formData, category: e.target.value })}
          style={styles.input}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="date" style={styles.label}>Date</label>
        <input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onFormChange({ ...formData, date: e.target.value })}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={handleSubmitClick}
          style={{
            ...styles.primaryButton,
            ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('submit')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
        <button
          onClick={onCancel}
          style={{
            ...styles.secondaryButton,
            ...(hoveredButton === 'cancel' ? styles.secondaryButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('cancel')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};