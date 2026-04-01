import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../components/modal";

describe("Modal Component", () => {
  test("renders correctly when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Modal</p>
      </Modal>
    );
    expect(screen.getByText("Modal")).toBeInTheDocument();
  });
});





