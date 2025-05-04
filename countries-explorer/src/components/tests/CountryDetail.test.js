import React from "react";
import { render, screen } from "../../test-utils";
import CountryDetail from "../CountryDetail";
import { mockCountries } from "../../mocks/handlers";

describe("CountryDetail Component", () => {
  const mockCountry = mockCountries[0]; // Use USA mock country

  test("renders loading state when country is null", () => {
    render(<CountryDetail country={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders detailed country information correctly", () => {
    render(<CountryDetail country={mockCountry} />);

    // Check country name
    expect(screen.getByText(mockCountry.name.common)).toBeInTheDocument();

    // Check official name
    expect(
      screen.getByText(new RegExp(mockCountry.name.official, "i"))
    ).toBeInTheDocument();

    // Check population (formatted with commas)
    expect(screen.getByText(/331,002,651/i)).toBeInTheDocument();

    // Check region and subregion
    expect(
      screen.getByText(new RegExp(mockCountry.region, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockCountry.subregion, "i"))
    ).toBeInTheDocument();

    // Check capital
    expect(
      screen.getByText(new RegExp(mockCountry.capital[0], "i"))
    ).toBeInTheDocument();

    // Check languages
    const languages = Object.values(mockCountry.languages).join(", ");
    expect(screen.getByText(new RegExp(languages, "i"))).toBeInTheDocument();

    // Check currencies
    const currencyInfo = Object.values(mockCountry.currencies)[0];
    expect(
      screen.getByText(
        new RegExp(`${currencyInfo.name} \\(${currencyInfo.symbol}\\)`, "i")
      )
    ).toBeInTheDocument();

    // Check flag image
    const flagImage = screen.getByAltText(`Flag of ${mockCountry.name.common}`);
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", mockCountry.flags.svg);

    // Check back button
    const backButton = screen.getByText(/back/i);
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("a")).toHaveAttribute("href", "/");

    // Check border countries section
    expect(screen.getByText(/border countries/i)).toBeInTheDocument();
    mockCountry.borders.forEach((border) => {
      expect(screen.getByText(border)).toBeInTheDocument();
    });
  });
});
