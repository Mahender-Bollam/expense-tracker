import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Expense Tracker testcases", () => {
  describe("UI testcases", () => {
    test("renders learn react link", () => {
      render(<App />);
      const linkElement = screen.getByText(/Expense Tracker/i);
      expect(linkElement).toBeInTheDocument();
    });
    test("I should open Modal properly" ,async()=>{
      render(<App />);
      const button = screen.getByRole("button" , {name: /Add Expense/});
      await userEvent.click(button)
      expect(screen.getByText("Add New Expense")).toBeInTheDocument();
    })
  });
});
