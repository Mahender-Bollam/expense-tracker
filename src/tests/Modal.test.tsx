import { fireEvent, render, screen } from "@testing-library/react"
import Modal from "../components/Modal"

describe("Modal",()=>{
    const isOpen=true;
    const onClose=jest.fn();
    const stopPropagation=jest.fn()
    test("should check on click propogation stopped",()=>{
        render( <Modal isOpen={isOpen} onClose={onClose} children/>)
        const modalChild=screen.getByTestId("modal-child");
        fireEvent.click(modalChild, {stopPropagation});
        expect(fireEvent.click(modalChild)).toBe(true)
    })

    test("should return null id isOpen false",()=>{
        const isOpen=false
        render( <Modal isOpen={isOpen} onClose={onClose} children/>)
        expect(isOpen).toBe(false);
    })
})
