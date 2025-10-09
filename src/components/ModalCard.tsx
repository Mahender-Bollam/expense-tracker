import { X } from 'lucide-react';
import Modal from './Modal';
import { styles } from '../styles/ExpenseTracker';
import { ModelCardProps } from '../interface/ModelProps';

const ModalCard=({isModalOpen,closeModal,formData,setFormData,hoveredButton,setHoveredButton,editingId,handleClick}:ModelCardProps)=>{
  const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
    return(
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
          >
            <X size={24} />
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: e.target.value })}
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
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
          <label style={styles.label}>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
          onClick={handleClick}
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === 'submit' ? styles.primaryButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('submit')}
            onMouseLeave={() => setHoveredButton(null)}
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
      </Modal>
    )
}
export default ModalCard;
