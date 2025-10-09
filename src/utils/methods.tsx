import React from "react";
import { useState } from "react";
import { Expense } from "../interface/data";
import { ModalProps } from "../interface/data";
import { FormData } from "../interface/data";


export const expenseMethods = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addData, setAddData] = useState<HoveredAddButton>(null)

   const [formData, setFormData] = useState<FormData>({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
      
    const[expense,setData] = useState<FormData>({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (expense: Expense): void => {
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };
  const totalExpense: number = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  

  const handleAdd = (expense:Expense): void =>{
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
    setAddData(expense)
    setIsModalOpen(false)
  }
}