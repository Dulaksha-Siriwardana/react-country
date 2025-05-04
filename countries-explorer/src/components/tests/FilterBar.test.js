import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";

describe("FilterBar Component", () => {
  test("renders region dropdown with options", () => {
    render(<FilterBar onRegionChange={() => {}} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // Check all region options are present
    expect(screen.getByText("Filter by Region")).toBeInTheDocument();
    expect(screen.getByText("Africa")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Oceania")).toBeInTheDocument();
  });

  test("calls onRegionChange when selection changes", () => {
    const mockOnRegionChange = jest.fn();
    render(<FilterBar onRegionChange={mockOnRegionChange} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "europe" } });

    expect(mockOnRegionChange).toHaveBeenCalledTimes(1);
    expect(mockOnRegionChange).toHaveBeenCalledWith("europe");
  });
});
