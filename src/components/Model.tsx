import { X } from "lucide-react";
import { HoveredButton } from "../types/Button";
import { styles } from "./Styles";
import { FormData } from "./ExpenseTrackor";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: number | null;
  closeModal: () => void;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
  setFormData: (value: React.SetStateAction<FormData>) => void;
  formData: FormData;
  hoveredButton: HoveredButton;
  categories: string[];
  updateExpense: () => void;
  addexpense: () => void
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose ,editingId,closeModal,setHoveredButton,setFormData,hoveredButton,formData,categories ,updateExpense,addexpense}) => {
  if (!isOpen) return null;

  return (
    <div  role="dialog" style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
            onClick={closeModal}
            style={{
              ...styles.closeButton,
              ...(hoveredButton === 'close' ? styles.closeButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('close')}
            onMouseLeave={() => setHoveredButton(null)}
            role="but"
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            style={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="amount"style={styles.label}>Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: Number(e.target.value) })}
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="category-select" style={styles.label}>Category</label>
          <select
            id="category-select"
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
            style={styles.input}
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="date"style={styles.label}>Date</label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            style={styles.input}
            placeholder="date"
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={editingId ? updateExpense : addexpense}

          >
            {editingId ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
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
      </div>
    </div>
  );
};

