import React from 'react';
import { X } from 'lucide-react';
import styles from '../styles/ExpenseModal.module.css';
import { FormData, HoveredButton } from '../types/types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  categories: string[];
  onSubmit: (e: React.FormEvent) => void; 
  hoveredButton: HoveredButton;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
  editingId: number | null;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  categories,
  onSubmit,
  hoveredButton,
  setHoveredButton,
  editingId,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{editingId ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button
            onClick={onClose}
            className={`${styles.closeButton} ${hoveredButton === 'close' ? styles.closeButtonHover : ''}`}
            onMouseEnter={() => setHoveredButton('close')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className={styles.input}
            placeholder="0.00"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={styles.input}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.primaryButton} ${hoveredButton === 'submit' ? styles.primaryButtonHover : ''}`}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={onSubmit}
          >
            {editingId ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
            onClick={onClose}
            className={`${styles.secondaryButton} ${hoveredButton === 'cancel' ? styles.secondaryButtonHover : ''}`}
            onMouseEnter={() => setHoveredButton('cancel')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
