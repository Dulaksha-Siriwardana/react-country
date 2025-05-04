import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Custom render function that includes Router
function render(ui, { route = "/", ...renderOptions } = {}) {
  window.history.pushState({}, "Test page", route);

  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Override render method
export { render };
