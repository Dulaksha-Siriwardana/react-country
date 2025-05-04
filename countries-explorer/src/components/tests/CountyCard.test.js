import React from "react";
import { render, screen } from "../../test-utils";
import CountryCard from "../CountryCard";
import { mockCountries } from "../../mocks/handlers";

describe("CountryCard Component", () => {
  const mockCountry = mockCountries[0]; // Use the USA mock country

  test("renders country information correctly", () => {
    render(<CountryCard country={mockCountry} />);

    // Check country name
    expect(screen.getByText(mockCountry.name.common)).toBeInTheDocument();

    // Check population (formatted with commas)
    expect(screen.getByText(/331,002,651/i)).toBeInTheDocument();

    // Check region
    expect(
      screen.getByText(new RegExp(mockCountry.region, "i"))
    ).toBeInTheDocument();

    // Check capital
    expect(
      screen.getByText(new RegExp(mockCountry.capital[0], "i"))
    ).toBeInTheDocument();

    // Check flag image
    const flagImage = screen.getByAltText(`Flag of ${mockCountry.name.common}`);
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", mockCountry.flags.svg);
  });

  test("links to the country detail page", () => {
    render(<CountryCard country={mockCountry} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/country/${mockCountry.cca3}`);
  });
});
