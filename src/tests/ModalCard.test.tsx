import { fireEvent, render, screen } from "@testing-library/react";
import { FormData } from "../interface/FormData";
import { HoveredButton } from "../interface/ModelProps";
import ModalCard from "../components/ModalCard";
import userEvent from "@testing-library/user-event";
import { styles } from "../styles/ExpenseTracker";

describe("ModalCard",()=>{
    let isModalOpen=true;
    let closeModal=jest.fn();
    let formData:FormData={
        id:3,description:"Coffee",amount:"35",category:'Food',date:"10/10/2003"
    }
    const setFormData=jest.fn();
    let hoveredButton:HoveredButton=null;
    let setHoveredButton=jest.fn();
    let editingId=null;
    let handleClick=jest.fn()
    const options={isModalOpen,closeModal,formData,setFormData,hoveredButton,setHoveredButton,editingId,handleClick}
    test("should click on closeModal",()=>{
        render(<ModalCard {...options}/>)
        const closeButton=screen.getByTestId("close-button")
        userEvent.click(closeButton)
        fireEvent.mouseEnter(closeButton)
        fireEvent.mouseLeave(closeButton)
    })
    test("should change input value on change",()=>{
        render(<ModalCard {...options}/>)
        const description=screen.getByPlaceholderText("Enter description");
        userEvent.type(description,"Coffee")
        const amount=screen.getByPlaceholderText("0.00");
        userEvent.type(amount,"35")
        const category=screen.getByTestId("select-category");
        userEvent.selectOptions(category,"Food") 
        const date=screen.getByTestId("date-input");
        userEvent.type(date,"2025-10-05")  
    })
    test("should click updateExpense button with editingId",()=>{
        const updatedOptions={...options,editingId:formData.id}
        render(<ModalCard {...updatedOptions}/>)
        const clickButton=screen.getByRole("button",{name:"Update Expense"})
        userEvent.click(clickButton)        
    })
    test("should click addExpense with editingId null",()=>{
        render(<ModalCard {...options}/>)
        const clickButton=screen.getByRole("button",{name:"Add Expense"})
        userEvent.click(clickButton);
        fireEvent.mouseEnter(clickButton)
        fireEvent.mouseLeave(clickButton)       
    })
    test("should click cancel to close modal",()=>{
        render(<ModalCard {...options}/>)
        const cancel=screen.getByRole("button",{name:"Cancel"})
        userEvent.click(cancel);
        fireEvent.mouseEnter(cancel)
        fireEvent.change(cancel,{target:{value:"submit"}});
        // expect(cancel).toHaveStyle({styles,hoveredButton:'submit'})    
        fireEvent.mouseLeave(cancel);
        
    })

    // test("should check hover button styles having content",()=>{
    //     render(<ModalCard {...options}/>);
    //     const styleElement=screen.getByRole
    // })
}) 