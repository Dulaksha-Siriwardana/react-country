import React from "react";
import { render, screen, waitFor, fireEvent } from "../../test-utils";
import HomePage from "../HomePage";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { mockCountries } from "../../mocks/handlers";

// Establish API mocking before all tests
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());

describe("HomePage Integration", () => {
  test("renders loading state initially", () => {
    render(<HomePage />);
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });

  test("renders country cards after data loads", async () => {
    render(<HomePage />);

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading countries/i)).not.toBeInTheDocument();
    });

    // Check that country cards are displayed
    mockCountries.forEach((country) => {
      expect(screen.getByText(country.name.common)).toBeInTheDocument();
    });
  });

  test("search functionality updates displayed countries", async () => {
    render(<HomePage />);

    // Wait for initial loading
    await waitFor(() => {
      expect(screen.queryByText(/loading countries/i)).not.toBeInTheDocument();
    });

    // Perform search
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: "United" } });

    const form = searchInput.closest("form");
    fireEvent.submit(form);

    // Check loading state during search
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();

    // Wait for results
    await waitFor(() => {
      expect(screen.queryByText(/loading countries/i)).not.toBeInTheDocument();
    });

    // Check only US is displayed, not Germany
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.queryByText("Germany")).not.toBeInTheDocument();
  });

  test("region filter updates displayed countries", async () => {
    render(<HomePage />);

    // Wait for initial loading
    await waitFor(() => {
      expect(screen.queryByText(/loading countries/i)).not.toBeInTheDocument();
    });

    // Use region filter
    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "europe" } });

    // Check loading state during filter
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();

    // Wait for results
    await waitFor(() => {
      expect(screen.queryByText(/loading countries/i)).not.toBeInTheDocument();
    });

    // Check only Germany is displayed, not US
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.queryByText("United States")).not.toBeInTheDocument();
  });

  test("displays error message when API fails", async () => {
    // Override the server handler for this test to simulate an error
    server.use(
      rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<HomePage />);

    // Wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch countries/i)
      ).toBeInTheDocument();
    });
  });
});
