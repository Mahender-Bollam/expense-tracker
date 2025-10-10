import { Expense } from "./expenseType"
import { HoveredButton, HoveredExpense } from "./hoverTypes"
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

export type expenseCardProp ={
expenses: Expense[]
hoveredButton: HoveredButton
setHoveredButton: React.Dispatch<React.SetStateAction<HoveredButton>>
hoveredExpense: HoveredExpense
setHoveredExpense: React.Dispatch<React.SetStateAction<HoveredExpense>>
setEditingId: React.Dispatch<React.SetStateAction<number | null>>
setFormData: React.Dispatch<React.SetStateAction<FormData>>
setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}