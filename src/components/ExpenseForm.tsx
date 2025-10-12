import React from 'react';
import { X } from 'lucide-react';
import { FormData, HoveredButton } from '../types/interface';
import '../styles/Styles.css';

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  categories: string[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editingId: number | null;
  hoveredButton: HoveredButton;
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  categories,
  handleSubmit,
  editingId,
  hoveredButton,
  setHoveredButton
}) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 className="modalTitle">{editingId ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button
            onClick={onClose}
            className={`closeButton ${hoveredButton === 'close' ? 'closeButtonHover' : ''}`}
            onMouseEnter={() => setHoveredButton('close')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="description" className="label">Description</label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="input"
              placeholder="Enter description"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="amount" className="label">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              className="input"
              placeholder="0.00"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="input"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="date" className="label">Date</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="buttonGroup">
            <button
              type="submit"
              className={`primaryButton ${hoveredButton === 'submit' ? 'primaryButtonHover' : ''}`}
              onMouseEnter={() => setHoveredButton('submit')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {editingId ? 'Update Expense' : 'Add Expense'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`secondaryButton ${hoveredButton === 'cancel' ? 'secondaryButtonHover' : ''}`}
              onMouseEnter={() => setHoveredButton('cancel')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
