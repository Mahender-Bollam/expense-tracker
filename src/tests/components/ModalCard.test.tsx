import { render, screen, fireEvent } from "@testing-library/react"
import ModalCard from "../../components/ModalCard"

const mockExpenses = [{ id: 1, description: 'Groceries', amount: 85.50, category: 'Food', date: '2025-10-05' }]

const mockFormData = {
    id: 2, description: 'Self', amount: '85', category: 'Shopping', date: '2025-10-10'
}

const mockSetExpenses = jest.fn()
const mockHoveredButton = ''
const mockSetHoveredButton = jest.fn()
const mockSetFormData = jest.fn()
const mockSetIsModalOpen = jest.fn()
const mockCloseModal = jest.fn
window.alert = jest.fn()



const renderComponent = (props={}) => {
    render(
        <ModalCard expenses={mockExpenses} setExpenses={mockSetExpenses}
            hoveredButton={mockHoveredButton} setHoveredButton={mockSetHoveredButton}
            setFormData={mockSetFormData}
            setIsModalOpen={mockSetIsModalOpen} isModalOpen={false}
            closeModal={mockCloseModal} editingId={null} formData={mockFormData} {...props}/>
    )
}


describe('Modal Card component', () => {

    test('Should add the expense', () => {
        renderComponent({isModalOpen:true})
        fireEvent.change(screen.getByPlaceholderText(/Enter description/i), { target: { value: 'Self' } });
        fireEvent.change(screen.getByPlaceholderText(/0.00/i), { target: { value: '260' } });
        fireEvent.change(screen.getByText(/Select Category/i), { target: { value: 'Shopping' } })
        fireEvent.click(screen.getByRole('button',{name: /Add Expense/i}))
    })
    test('Should able to edit the expense',()=>{
        renderComponent({editingId:mockExpenses[0].id,isModalOpen:true })
        fireEvent.change(screen.getByPlaceholderText(/Enter description/i),{ target: { value: 'MySelf' } })
        fireEvent.click(screen.getByRole('button',{name: /Update Expense/i}))
        expect(mockSetFormData).toHaveBeenCalledWith({
            ...mockFormData, description: 'MySelf'
        })
    })
})


