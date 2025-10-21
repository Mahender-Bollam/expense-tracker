import { renderHook } from "@testing-library/react"
import useExpenseOperations from "../components/useExpenseOperations"
import { Expense } from "../interface/Expense"
import { FormData } from "../interface/FormData";
import { act } from "react";
import { ExpenseOperationsProps } from "../interface/ExpenseOperationsProps";

describe("useExpenseOperations",()=>{
    let expenses: Expense[];
    let formData: FormData;
    let editingId: number | null;
    let setIsModalOpen: jest.Mock;
    let setEditingId: jest.Mock;
    let setFormData: jest.Mock;
    let setExpenses: jest.Mock;
    let options: ExpenseOperationsProps;
    let expense:Expense;
    beforeEach(()=>{
        window.alert=jest.fn();
         expenses = [
      { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
      { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' }
        ];
        formData = { id: 3, description: "Coffee", amount: "35", category: 'Food', date: "2025-10-10" };
        editingId = null;
        setIsModalOpen = jest.fn();
        setEditingId = jest.fn();
        setFormData = jest.fn();
        setExpenses = jest.fn();
        options = { expenses, formData, editingId, setIsModalOpen, setEditingId, setFormData, setExpenses };
        expense={ id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' }
    })
   
    test("should close model",()=>{
        const {result}=renderHook(()=>useExpenseOperations({...options}));
        act(()=>result.current.closeModal())
        console.log("edit",options.setIsModalOpen)
        expect(options.setIsModalOpen).toHaveBeenCalledWith(false);
        expect(options.setEditingId).toHaveBeenCalledWith(null)  
    })

     test("should handle edit button",()=>{
        const updatedOptions={...options,editingId:formData.id}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        act(()=>result.current.handleEdit(expense))
        expect(options.setIsModalOpen).toHaveBeenCalledWith(true);
        expect(options.setEditingId).toHaveBeenCalled()  
    })

    test("should addExpense with empty fields",()=>{
        formData={id:0,description:"",amount:"",category:"",date:""}
        const updatedOptions={...options,formData:formData}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        console.log("empty",updatedOptions.formData)
        act(()=>result.current.addExpense()); 
        expect(window.alert).toHaveBeenCalledWith("Please fill all the fields.")
    })

    test("should addExpense with amount >0",()=>{
        window.alert=jest.fn();
        formData={id:0,description:"cofee",amount:"-56",category:"food",date:"2025-10-11"}
        const updatedOptions={...options,formData:formData}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        console.log("empty",updatedOptions.formData)
        act(()=>result.current.addExpense()); 
        expect(window.alert).toHaveBeenCalledWith("Amount must be greater than zero.")
    })

    test("should addExpense with correct",()=>{
        window.alert=jest.fn();
        const {result}=renderHook(()=>useExpenseOperations({...options}));
        act(()=>result.current.addExpense()); 
    })

     test("should updateExpense with empty fields",()=>{
        formData={id:0,description:"",amount:"",category:"",date:""}
        const updatedOptions={...options,formData:formData}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        console.log("empty",updatedOptions.formData)
        act(()=>result.current.updateExpense()); 
        expect(window.alert).toHaveBeenCalledWith("Please fill all the fields.")
    })

    test("should updateExpense with amount >0",()=>{
        window.alert=jest.fn();
        formData={id:0,description:"cofee",amount:"-56",category:"food",date:"2025-10-11"}
        const updatedOptions={...options,formData:formData}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        console.log("empty",updatedOptions.formData)
        act(()=>result.current.updateExpense()); 
        expect(window.alert).toHaveBeenCalledWith("Amount must be greater than zero.")
    })

    test("should updateExpense with correct details",()=>{
        window.alert=jest.fn();
        formData={ id: 1, description: 'Groce', amount: "85.50", category: 'Food', date: '2025-10-05' }
        const updatedOptions={...options,formData:formData}
        const {result}=renderHook(()=>useExpenseOperations({...updatedOptions}));
        act(()=>result.current.updateExpense());
        expect(updatedOptions.setExpenses).toHaveBeenCalled();
    })

    test("should handle delete button",()=>{
        const {result}=renderHook(()=>useExpenseOperations({...options}));
        act(()=>result.current.handleDelete(expense))
    })
    
})