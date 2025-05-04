import "@testing-library/jest-dom";

// Suppress console errors in tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
