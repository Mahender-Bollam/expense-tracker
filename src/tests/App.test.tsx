import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    console.warn(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("App Routing", () => {
  test("renders expense page", () => {
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Expense Tracker/i })).toBeInTheDocument();
  });  
});


