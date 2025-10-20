
import { useEffect, useState } from 'react';
import {
    getExpenses,
    addExpense as addExpenseAPI,
    updateExpense as updateExpenseAPI,
    deleteExpense as deleteExpenseAPI
} from '../api/expenseAPI';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}
export interface ExpenseFormData {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export const useExpenseTracker = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [formData, setFormData] = useState<ExpenseFormData>({
        id: 0,
        description: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            alert('Failed to load expenses from server');
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
            id: expenses.length + 1,
            description: '',
            amount: Number(""),
            category: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    const updateExpense = async () => {
        const { id, description, amount, category, date } = formData;

        if (amount <= 0) {
            alert("Amount should be greater than 0");
            return;
        }

        if (!description || !category || !date) {
            alert("Please fill all fields");
            return;
        }

        try {
            await updateExpenseAPI(formData);
            setExpenses(prev =>
                prev.map(exp => (exp.id === id ? formData : exp))
            );
            alert("Expense updated successfully.");
            setIsModalOpen(false);
            setEditingId(null);
        } catch (error) {
            alert("Failed to update expense");
            console.error(error);
        }
    };

    const addexpense = async () => {
        const { description, amount, category, date } = formData;

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            alert("Amount should be a positive number");
            return;
        }

        if (!description || !category || !date) {
            alert("Please fill all fields");
            return;
        }

        try {
            const newExpense = await addExpenseAPI({
                ...formData,
                amount: numericAmount
            });
            setExpenses(prev => [...prev, newExpense.saved]);
            alert("Expense added successfully");
            setIsModalOpen(false);
        } catch (error) {
            alert("Failed to add expense");
            console.error(error);
        }
    };

    const removeExpense = async (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmOption = confirm("Are you sure you want to remove this expense?");
        if (!confirmOption) return;

        try {
            await deleteExpenseAPI(id.toString());
            setExpenses(prevExpenses => prevExpenses.filter(item => item.id !== id));
            alert("Expense removed successfully");
        } catch (error) {
            alert("Failed to remove expense");
            console.error(error);
        }
    };

    const handleEdit = (expense: Expense) => {
        setFormData(expense);
        setEditingId(expense.id);
        setIsModalOpen(true);
    };

    const handleAddExpense = () => {
        setIsModalOpen(true);
    };

    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {expenses,formData,editingId,isModalOpen,categories,totalExpense,setFormData, setEditingId,setIsModalOpen,closeModal,updateExpense,addexpense,removeExpense,handleEdit,handleAddExpense};
};
