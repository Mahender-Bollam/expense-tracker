import { Expense, FormData } from "../types/type"
import { setIdOfExpense, validateExpense } from "../utils/ValidateExpense"


jest.spyOn(window,'alert')
    
describe("ValidateExpense.ts module test suit",()=>{
    let mockedFormData : FormData ;
    let mockedExpenses: Expense[];
    let mockedEditingId: number | null;
    beforeEach(()=>{
        
        mockedExpenses = [
            { id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' },
            { id: 2, description: 'Gas', amount: 45.00, category: 'Transport', date: '2025-10-06' },
        ];
        mockedEditingId = null;
    });
    afterEach(()=>{
        jest.clearAllMocks()
    })

    test("should isExpenseValid return true because all values in form data is valid",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Party with friends",
            category: "Other",
            amount: String(500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeTruthy()
    });

    test("should isExpenseValid return false when description value in form data is empty",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "",
            category: "Other",
            amount: String(500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });

    test("should isExpenseValid return false when category value in form data is empty",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Party with friends",
            category: "",
            amount: String(500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });

    test("should isExpenseValid return false when amount value in form data is less than '0'",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Party with friends",
            category: "Other",
            amount: String(-500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });

    test("should isExpenseValid return false when amount value in form data is equal to '0'",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Party with friends",
            category: "Other",
            amount: String(0)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });
    
    test("should isExpenseValid return false while adding new expense when new expense description Gas is present in privious expenses",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Gas",
            category: "Other",
            amount: String(500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });

    test("should isExpenseValid return true while editing an existing expense when expense description is present in privious expenses",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Gas",
            category: "Other",
            amount: String(500)
        };
        mockedEditingId = 1;
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeTruthy()
    });

    test("should isExpenseValid call window 'alert' object with message 'The entered expense Gas alredy exists' while adding new expense when new expense description is present in privious expenses",()=>{
        mockedFormData = {
            date: (new Date()).toJSON().slice(0,10),
            description: "Gas",
            category: "Other",
            amount: String(500)
        };
        validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(window.alert).toHaveBeenCalledWith(`The entered expense ${mockedFormData.description} alredy exists`)
    });

    test("should isExpenseValid return false when date value in form data is more than today's date",()=>{
        mockedFormData = {
            date: '3000-12-31',
            description: "Party with friends",
            category: "Other",
            amount: String(500)
        };
        const isExpenseValid = validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(isExpenseValid).toBeFalsy()
    });

    test(`should isExpenseValid call window 'alert' object with message 'Future date i.e 3000-12-31 expense can't add in today i.e date: ${(new Date()).toJSON().slice(0,10)}' while adding new expense when new expense description is present in privious expenses`,()=>{
        mockedFormData = {
            date: '3000-12-31',
            description: "Party with friends",
            category: "Other",
            amount: String(500)
        };
        validateExpense([mockedFormData,mockedExpenses,mockedEditingId]);
        expect(window.alert).toHaveBeenCalledWith(`Future date i.e ${mockedFormData.date} expense can't add in today i.e date: ${(new Date()).toJSON().slice(0,10)}`)
    });

    test("should return '1' when the expenses array have '0' expense",()=>{
        const generateId = setIdOfExpense([]);
        expect(generateId).toEqual(1)
    });

    test("should return '3' when the expenses array have '2' expense",()=>{
        const generateId = setIdOfExpense(mockedExpenses);
        expect(generateId).toEqual(3)
    });

})