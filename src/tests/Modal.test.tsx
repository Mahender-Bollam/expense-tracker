import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import ModalCard from "../components/Modal";
import userEvent from "@testing-library/user-event";
import { Expense, FormData } from "../types/ExpenseDetails";
import { X } from "lucide-react";


describe('test the modal',()=>{
  let isModalOpen : boolean
  let closeModal:jest.Mock
  let editingId : number | null
  let formData : FormData
  let setFormData: jest.Mock
  let hoveredButton: string | null
  let setHoveredButton : jest.Mock
  let expenses :Expense[]
  let setExpenses :jest.Mock
  let setIsModalOpen :jest.Mock

    beforeEach(() => {
      //Here we giving a value
      isModalOpen = false
      closeModal = jest.fn()
      editingId = null
      formData = {
      id:'2',
      description: 'semi',
      amount: 30,
      category: 'food',
      date: '6/10/2025'
    }
      setFormData =  jest.fn()
      hoveredButton = null
      setHoveredButton = jest.fn()
      expenses = [{id:2,
      description: 'fruits',
      amount: 90,
      category: 'food',
      date: '6/10/2025'}]
      setExpenses = jest.fn()
      setIsModalOpen = jest.fn()
       
    });
    

    const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const ModalCardProps = (props={}) =>{
    render(
        <ModalCard
        isModalOpen={false}
        closeModal={closeModal}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        setHoveredButton={setHoveredButton}
        hoveredButton={hoveredButton}
        expenses={expenses}
        setExpenses={setExpenses}
        setIsModalOpen={setIsModalOpen}
        {...props}/>
        
    )
   
  }
  
  test("render model if the model true",()=>{
    ModalCardProps({isModalOpen:true})
    const descript = screen.getByPlaceholderText(/Enter description/i)
    expect(descript).toBeInTheDocument()
    // const cat = screen.getByPlaceholderText(/Category/i)
    // expect(cat).toBeInTheDocument()
    const amt = screen.getByPlaceholderText(/0.00/i)
    expect(amt).toBeInTheDocument()
  })

  test('set an expense using form description',()=>{
    ModalCardProps({isModalOpen:true});
    const description =screen.getByPlaceholderText(/Enter description/i)
    fireEvent.change(description,{target:{value:'biryani'}});
    expect(setFormData).toHaveBeenCalledWith({...formData,description:'biryani'})

  })
    test('set an expense using form in amount',()=>{
    ModalCardProps({isModalOpen:true});
    const amount =screen.getByPlaceholderText(/0.00/i) as unknown as HTMLInputElement
    fireEvent.change(amount,{target:{value:'100'}});
    expect(setFormData).toHaveBeenCalledWith({...formData,amount:'100'})

  })
  test('handle the submit data',()=>{
    ModalCardProps({isModalOpen:true});
    fireEvent.change( screen.getByPlaceholderText(/Enter description/i),{target:{value:'bus'}})
    fireEvent.change(screen.getByPlaceholderText(/0.00/i),{target:{value:'200'}})
    // fireEvent.change(screen.getByPlaceholderText(/category/i),{target:{value:'transport'}})
    fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));
  })
  
   test('handle the update data',()=>{
    ModalCardProps({editingId:expenses[0].id, isModalOpen:true});
    fireEvent.change( screen.getByPlaceholderText(/Enter description/i),{target:{value:'carrot'}})
    // fireEvent.change(screen.getByPlaceholderText(/category/i),{target:{value:'transport'}})
    fireEvent.click(screen.getByRole("button", { name: "Update Expense" }));
    expect(setFormData).toHaveBeenCalledWith({...formData,description:"carrot"})
  })
  test('handle the close icon',()=>{
    ModalCardProps({isModalOpen:true});
    const icon = screen.getByTestId('close-icon')
    fireEvent.mouseEnter(icon)
    fireEvent.mouseLeave(icon)
  })
   test('handle the cancel button',()=>{
    ModalCardProps({isModalOpen:true});
    const cancel = screen.getByTestId('cancel-button')
    fireEvent.mouseEnter(cancel)
    fireEvent.mouseLeave(cancel)
  })
   test('when click a submit button hover the button',()=>{
    ModalCardProps({isModalOpen:true});
    const submit = screen.getByTestId('submit-button')
    fireEvent.mouseEnter(submit)
    fireEvent.mouseLeave(submit)
  })


})

