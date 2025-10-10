import { X } from 'lucide-react';
import Modal from './Modal';
import { styles } from '../styles/ExpenseTracker';
import { ModelCardProps } from '../interface/ModelProps';

const ModalCard=(props:ModelCardProps)=>{
  const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
    return(
        <Modal isOpen={props.isModalOpen} onClose={props.closeModal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {props.editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
            data-testid="close-button"
            onClick={props.closeModal}
            style={{
              ...styles.closeButton,
              ...(props.hoveredButton === 'close' ? styles.closeButtonHover : {})
            }}
            onMouseEnter={() => props.setHoveredButton('close')}
            onMouseLeave={() => props.setHoveredButton(null)}
          >
            <X size={24} />
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={props.formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setFormData({ ...props.formData, description: e.target.value })}
            style={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input
            type="number"
            step="0.01"
            value={props.formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setFormData({ ...props.formData, amount: e.target.value })}
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select data-testid="select-category"
            value={props.formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.setFormData({ ...props.formData, category: e.target.value })}
            style={styles.input}
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input
            data-testid="date-input"
            type="date"
            value={props.formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setFormData({ ...props.formData, date: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
          onClick={props.handleClick}
            style={{
              ...styles.primaryButton,
              ...(props.hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onMouseEnter={() => props.setHoveredButton('submit')}
            onMouseLeave={() => props.setHoveredButton(null)}
          >
            {props.editingId ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
            onClick={props.closeModal}
            style={{
              ...styles.secondaryButton,
              ...(props.hoveredButton === 'cancel' ? styles.secondaryButtonHover : {})
            }}
            onMouseEnter={() => props.setHoveredButton('cancel')}
            onMouseLeave={() => props.setHoveredButton(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    )
}
export default ModalCard;
