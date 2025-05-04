import React from "react";
import { render, screen } from "../../test-utils";
import Header from "../Header";

describe("Header Component", () => {
  test("renders header with app title", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const titleElement = screen.getByText(/Countries Explorer/i);
    expect(titleElement).toBeInTheDocument();

    // Check that title is a link to homepage
    expect(titleElement.closest("a")).toHaveAttribute("href", "/");
  });
});
