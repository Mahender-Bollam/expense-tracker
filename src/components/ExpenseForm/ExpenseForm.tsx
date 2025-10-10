import React, { CSSProperties } from 'react';
import { X } from 'lucide-react';
import { FormData, HoveredButton } from '../../types/types';

interface ExpenseFormProps {
  formData: FormData;
  errors: Partial<FormData>;
  editingId: number | null;
  categories: string[];
  hoveredButton: HoveredButton;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
  onSubmit: () => void;
  closeModal: () => void;
}

const styles: Record<string, CSSProperties> = {
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  closeButton: {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'background-color 0.2s'
  },
  closeButtonHover: {
    backgroundColor: '#f3f4f6'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  primaryButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  primaryButtonHover: {
    backgroundColor: '#4f46e5'
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  secondaryButtonHover: {
    backgroundColor: '#f9fafb'
  },
  error: {
    color: 'red'
  }
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  formData,
  errors,
  editingId,
  categories,
  hoveredButton,
  setFormData,
  setHoveredButton,
  onSubmit,
  closeModal
}) => {
  return (
    <>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>
          {editingId ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <button
          data-testid='close-button'
          onClick={closeModal}
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
        <span style={styles.error}>{errors.description}</span>
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
          min={0}
        />
        <span style={styles.error}>{errors.amount}</span>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          value={formData.category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFormData({ ...formData, category: e.target.value })
          }
          style={styles.input}
          data-testid="cateegoryid"
        >
          <option value="">Select category</option>
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span style={styles.error}>{errors.category}</span>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, date: e.target.value })
          }
          style={styles.input}
          placeholder="Enter date"
        />
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.primaryButton,
            ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
          }}
          onClick={onSubmit}
          data-testid="submit-button"
          onMouseEnter={() => setHoveredButton('submit')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
        <button
          data-testid="cancel-button"
          onClick={closeModal}
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

export default ExpenseForm;
