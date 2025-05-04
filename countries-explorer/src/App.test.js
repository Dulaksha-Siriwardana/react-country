import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { server } from "./mocks/server";

// Establish API mocking before all tests
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());

// Mock the useParams hook to avoid router errors
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));

describe("App Component", () => {
  test("renders the app with header", () => {
    render(<App />);

    // Check header is rendered
    expect(screen.getByText(/Countries Explorer/i)).toBeInTheDocument();
  });
});
