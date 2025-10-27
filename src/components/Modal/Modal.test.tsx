import { fireEvent, render, screen } from "@testing-library/react"
import { Modal } from "./Modal"
const mockclose = jest.fn()

describe('Modal', () => {
    test("shows modal component", () => {
        render(<Modal isOpen={true} onClose={mockclose}><div>Text</div></Modal>)
        expect(screen.getByText('Text')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId("modal"))
        expect(mockclose).toHaveBeenCalled()
        
    })
    test("hides modal component", () => {
        render(<Modal isOpen={false} onClose={mockclose}><div>Text</div></Modal>)
        expect(screen.queryByText('Text')).not.toBeInTheDocument()
    })
})
