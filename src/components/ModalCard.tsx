import { FormData } from '../types/formDataType';
import { styles } from '../styles/Styles';
import Modal from './ModalComponent';
import { X } from 'lucide-react';
import { modalCardProp } from '../types/propTypes';

const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

const ModalCard = ({isModalOpen, closeModal,editingId,hoveredButton,setHoveredButton,formData,setFormData,expenses,setExpenses,setIsModalOpen}:modalCardProp) => {

   const handleSubmit =()=>{
    setFormData({
      description: formData.description,
      amount: formData.amount,
      category: formData.category,
      date:  formData.date,
      id: expenses.length+1
      })
    setExpenses([...expenses,{...formData, amount: Number(formData.amount)}])
    setIsModalOpen(false)
  }
  const handleEditSubmit =(expense:FormData,e:any)=>{
    setFormData({
      id:expense.id,
      description: e.target.value,
      amount: Number(e.target.value),
      category: e.target.value,
      date: e.target.value
      })
      const updatedExpenses={
        id:formData.id,
        description:formData.description,
        amount:Number(formData.amount),
        category:formData.category,
        date:formData.date
      }
       
      setExpenses(prevExpenses=>{
        return prevExpenses.map((item)=>item.id === editingId ? updatedExpenses : item)
      })
      console.log(formData)
      console.log(expenses)
      setIsModalOpen(false)
    }


  return (
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: Number(e.target.value)})}
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
          onClick={editingId ? (e:any)=>handleEditSubmit(formData,e):handleSubmit}
            style={{
              ...styles.primaryButton,
              ...(hoveredButton === 'submit' ? styles.primaryButtonHover :{})
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

export default ModalCard