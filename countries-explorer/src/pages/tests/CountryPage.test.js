import React from "react";
import { render, screen, waitFor } from "../../test-utils";
import CountryPage from "../CountryPage";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { mockCountries } from "../../mocks/handlers";

// Mock the useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ code: "USA" }),
}));

// Establish API mocking before all tests
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());

describe("CountryPage Integration", () => {
  test("renders loading state initially", () => {
    render(<CountryPage />);
    expect(screen.getByText(/loading country details/i)).toBeInTheDocument();
  });

  test("renders country details after data loads", async () => {
    render(<CountryPage />);

    // Wait for loading to disappear
    await waitFor(() => {
      expect(
        screen.queryByText(/loading country details/i)
      ).not.toBeInTheDocument();
    });

    const country = mockCountries[0]; // USA

    // Check country name is displayed
    expect(screen.getByText(country.name.common)).toBeInTheDocument();

    // Check back button is present
    expect(screen.getByText(/back/i)).toBeInTheDocument();

    // Check detailed info is present
    expect(
      screen.getByText(new RegExp(country.region, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(country.capital[0], "i"))
    ).toBeInTheDocument();
    expect(screen.getByText(/331,002,651/i)).toBeInTheDocument(); // Formatted population

    // Check border countries section
    expect(screen.getByText(/border countries/i)).toBeInTheDocument();
    country.borders.forEach((border) => {
      expect(screen.getByText(border)).toBeInTheDocument();
    });
  });

  test("displays error when API fails", async () => {
    // Override the server handler for this test to simulate an error
    server.use(
      rest.get(
        "https://restcountries.com/v3.1/alpha/:code",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<CountryPage />);

    // Wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch country details/i)
      ).toBeInTheDocument();
    });
  });
});
