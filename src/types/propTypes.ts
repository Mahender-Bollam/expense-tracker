import { Expense } from "./expenseType"
import { HoveredButton } from "./hoverTypes"
import { FormData } from "./formDataType"

export type modalCardProp = {
  isModalOpen: boolean
  closeModal: () => void
  editingId: number | null
  hoveredButton: HoveredButton
  setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}