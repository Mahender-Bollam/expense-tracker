import { BASEURL } from "../constants/url"
import axios from "axios"
import { Expense } from "../types/types"

export const createExpense = async (expense: Omit<Expense, 'id'>) => {
    const response = await axios.post(`${BASEURL}/expenses`, expense)
    return response.data
}

export const getExpenses = async () => {
    const response = await axios.get(`${BASEURL}/expenses`);
    return response.data
}

export const updateExpense = async (id: number, newData: Omit<Expense, 'id'>) => {
    const response = await axios.patch(`${BASEURL}/expenses/${id}`, newData)
    return response.data
}

export const deleteExpense = async (id: number) => {
    return await axios.delete(`${BASEURL}/expenses/${id}`)
}
