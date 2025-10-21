import { HandleButtonProps, ModalProps } from "../types/ExpenseDetails";
import { styles } from "../styles";
import { X } from "lucide-react";
import { addTheExpense } from "../backendConnection/api";

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

const ModalCard = ({
  isModalOpen,
  closeModal,
  editingId,
  formData,
  setFormData,
  setHoveredButton,
  hoveredButton,
  expenses,
  setExpenses,
  setIsModalOpen,
}: HandleButtonProps) => {
  const handleSubmit = async () => {
    const data = {
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    try {
      const newExpense = await addTheExpense(data);
      const addNewExpense = {
        ...newExpense,
        amount: Number(newExpense.amount),
      };

      if (isNaN(addNewExpense.amount)) {
        console.error("Received invalid amount from API:", newExpense.amount);
        return;
      }

      setExpenses([...expenses, addNewExpense]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const handleEditSubmit = async (expense: any, e: any) => {
    let { id, description, amount, category, date } = formData;
    amount = Number(amount);
    const data = { id, description, amount, category, date };
    try {
      const editExpense = await updateTheExpense(data);
      setExpenses((prevExpense: any[]) => {
        return prevExpense.map((item) =>
          item.id === editingId ? editExpense : item,
        );
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("failed the fetched data.");
    }
  };

  const categories: string[] = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Health",
    "Other",
  ];
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>
          {editingId ? "Edit Expense" : "Add New Expense"}
        </h2>
        <button
          data-testid="close-icon"
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
        <label htmlFor="desc" style={styles.label}>
          Description
        </label>
        <input
          id="decs"
          type="text"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={styles.input}
          placeholder="Enter description"
          data-testid="description"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Amount</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
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
          style={styles.input}
        >
          <option value="">Select category</option>
          {categories.map((cat: string) => (
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, date: e.target.value })
          }
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button
          data-testid="submit-button"
          //   onClick={handleSubmit}
          onClick={
            editingId ? (e: any) => handleEditSubmit(formData, e) : handleSubmit
          }
          style={{
            ...styles.primaryButton,
            ...(hoveredButton === "submit" ? styles.primaryButtonHover : {}),
          }}
          onMouseEnter={() => setHoveredButton("submit")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
        <button
          data-testid="cancel-button"
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
    </Modal>
  );
};
export default ModalCard;
