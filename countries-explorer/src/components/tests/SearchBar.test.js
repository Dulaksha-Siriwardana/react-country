import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  test("renders search input field", () => {
    render(<SearchBar onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onSearch when form is submitted", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: "Germany" } });

    const form = searchInput.closest("form");
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Germany");
  });

  test("updates input value on change", () => {
    render(<SearchBar onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: "United" } });

    expect(searchInput.value).toBe("United");
  });
});
