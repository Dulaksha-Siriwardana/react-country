import { rest } from "msw";

// Sample country data for tests
export const mockCountries = [
  {
    name: {
      common: "United States",
      official: "United States of America",
    },
    cca3: "USA",
    capital: ["Washington, D.C."],
    region: "Americas",
    subregion: "North America",
    population: 331002651,
    languages: { eng: "English" },
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    flags: {
      svg: "https://restcountries.com/data/usa.svg",
      alt: "Flag of United States",
    },
    borders: ["CAN", "MEX"],
  },
  {
    name: {
      common: "Germany",
      official: "Federal Republic of Germany",
    },
    cca3: "DEU",
    capital: ["Berlin"],
    region: "Europe",
    subregion: "Western Europe",
    population: 83240525,
    languages: { deu: "German" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    flags: {
      svg: "https://restcountries.com/data/deu.svg",
      alt: "Flag of Germany",
    },
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
  },
];

export const handlers = [
  // Handle GET /all endpoint
  rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCountries));
  }),

  // Handle GET /name/{name} endpoint
  rest.get("https://restcountries.com/v3.1/name/:name", (req, res, ctx) => {
    const { name } = req.params;
    const filteredCountries = mockCountries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredCountries.length === 0) {
      return res(ctx.status(404), ctx.json({ message: "Not found" }));
    }

    return res(ctx.status(200), ctx.json(filteredCountries));
  }),

  // Handle GET /region/{region} endpoint
  rest.get("https://restcountries.com/v3.1/region/:region", (req, res, ctx) => {
    const { region } = req.params;
    const filteredCountries = mockCountries.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );

    return res(ctx.status(200), ctx.json(filteredCountries));
  }),

  // Handle GET /alpha/{code} endpoint
  rest.get("https://restcountries.com/v3.1/alpha/:code", (req, res, ctx) => {
    const { code } = req.params;
    const country = mockCountries.find(
      (country) => country.cca3.toLowerCase() === code.toLowerCase()
    );

    if (!country) {
      return res(ctx.status(404), ctx.json({ message: "Not found" }));
    }

    return res(ctx.status(200), ctx.json([country]));
  }),
];
