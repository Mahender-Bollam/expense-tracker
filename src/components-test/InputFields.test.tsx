import { render,screen } from "@testing-library/react"
import { InputFields } from "../components/InputFields"
import userEvent from "@testing-library/user-event";

describe('InputFields.tsx module test-suit',()=>{

    test(`should allow user to type input values to the input fields of Modal component`,()=>{
        render(
            <InputFields/>
        );
        userEvent.type(screen.getByPlaceholderText('Enter description'),'Woodland shoes');
        userEvent.type(screen.getByPlaceholderText('0.00'),'1000');
        userEvent.selectOptions(screen.getByRole("combobox"), "Shopping")
        userEvent.type(screen.getAllByRole('textbox').at(-1) as HTMLElement,`2020-10-12`);
        expect(screen.getByText('Description')).toBeInTheDocument()
    });
})