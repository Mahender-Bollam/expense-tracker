import { render ,screen ,fireEvent} from "@testing-library/react";
import { Modal } from "../components/Model"
import userEvent from "@testing-library/user-event";



describe("Test cases for model component",()=>{
  let onClose: jest.Mock;
  let closeModel: jest.Mock;
  let setHoveredButton: jest.Mock;
  let setFormData: jest.Mock;
  let updateExpense :jest.Mock;
  let addexpense : jest.Mock

  beforeEach(() => {
    onClose = jest.fn();
    closeModel = jest.fn();
    setHoveredButton = jest.fn();
    setFormData = jest.fn();
    updateExpense = jest.fn();
    addexpense = jest.fn();
  });
      const categories: string[] = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

    const formdata = {
      id:  1,
      description: 'water',
      amount: 10,
      category: categories[0],
      date: new Date().toISOString().split('T')[0]
    };
    function renderComponent(props = {}) {
    return render(
     
        <Modal
          isOpen={false}
          onClose={onClose}
          editingId={null}
          closeModal={closeModel}
          setHoveredButton={setHoveredButton}
          setFormData={setFormData}
          hoveredButton={null}
          formData={formdata}
          updateExpense={updateExpense}
          addexpense={addexpense}
          categories={categories}
          {...props}
        />
    
    );
  }

  it("Should render model component when isopen true",()=>{
    renderComponent({isOpen:true})
    const description = screen.getByText(/description/i)
    const amount = screen.getByText(/amount/i)
    const category = screen.getByText(/select category/i)
    expect(description).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  })

  it("Should close model after clicking the X",()=>{
    renderComponent({isOpen:true})
    const xButton = screen.getByRole('but');
    userEvent.click(xButton);
    fireEvent.mouseLeave(xButton)
    fireEvent.mouseEnter(xButton)
  })

  it("Should set formdata to when entering description", () => {
  renderComponent({ isOpen: true });
  const description = screen.getByPlaceholderText(/enter description/i);
  fireEvent.change(description, { target: { value: 'waterpacket' } });
  expect(setFormData).toHaveBeenCalledWith({
    ...formdata,
    description: 'waterpacket',
  });
});


it("Should set formdata to when entering amount",()=>{
    renderComponent({isOpen:true})
    const amount = screen.getByPlaceholderText(/0.00/i) as unknown as HTMLInputElement;
    fireEvent.change(amount, { target: { value: 690 } });
    expect(setFormData).toHaveBeenCalledWith({
    ...formdata,
    amount: 690,
  });
  })

  it("Should set formdata when entering date", async () => {
  renderComponent({ isOpen: true });
  const date = screen.getByPlaceholderText(/date/i) as unknown as HTMLInputElement;
  await userEvent.clear(date);
  await userEvent.type(date, formdata.date);
  expect(setFormData).toHaveBeenCalled();

});

it("Should update formData when selecting a category", () => {
  renderComponent({ isOpen: true }); 
  const select = screen.getByLabelText(/category/i);

  fireEvent.change(select, { target: { value: 'Transport' } });
  expect(setFormData).toHaveBeenCalledWith({
    ...formdata,
    category: 'Transport',
  });
});
  it("Should able to click add expense button",()=>{
    renderComponent({isOpen:true} )
    const addExpenseButton = screen.getByRole('button',{name:/Add expense/i});
    fireEvent.click(addExpenseButton)
    fireEvent.mouseLeave(addExpenseButton)
    fireEvent.mouseEnter(addExpenseButton)
    expect(addexpense).toHaveBeenCalled();
  })
  it("Should select the category options",()=>{
    renderComponent({isOpen:true})
    const category=screen.getByRole("option",{name:/select category/i});
    fireEvent.select(category,formdata.category)
  })

  it("Should able to click edit expense button",()=>{
    renderComponent({isOpen:true, editingId:formdata.id}, )
    const editExpenseButton = screen.getByRole('button',{name:/Update expense/i});
    fireEvent.click(editExpenseButton)
    fireEvent.mouseLeave(editExpenseButton)
    fireEvent.mouseEnter(editExpenseButton)
    expect(updateExpense).toHaveBeenCalled()
  })

  it("Should close model after clicking the cancel button",()=>{
    renderComponent({isOpen:true })
    const cancelButton = screen.getByRole('button',{name:/cancel/i});
    userEvent.click(cancelButton);
    fireEvent.mouseLeave(cancelButton)
    fireEvent.mouseEnter(cancelButton)
  })

  it("Should not render model component when isopen false",()=>{
    renderComponent({isOpen:false})
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  })
})