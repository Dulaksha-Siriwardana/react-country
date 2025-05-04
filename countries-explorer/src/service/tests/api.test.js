import {
  getAllCountries,
  getCountriesByName,
  getCountriesByRegion,
  getCountryByCode,
} from "../api";
import { mockCountries } from "../../mocks/handlers";
import { server } from "../../mocks/server";

// Establish API mocking before all tests
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());

describe("API Service", () => {
  test("getAllCountries fetches all countries", async () => {
    const countries = await getAllCountries();
    expect(countries).toEqual(mockCountries);
    expect(countries.length).toBe(mockCountries.length);
  });

  test("getCountriesByName returns matching countries", async () => {
    const countries = await getCountriesByName("United");
    expect(countries).toEqual([mockCountries[0]]);
  });

  test("getCountriesByName returns empty array for non-existing country", async () => {
    const countries = await getCountriesByName("NonExistentCountry");
    expect(countries).toEqual([]);
  });

  test("getCountriesByRegion returns countries from specific region", async () => {
    const countries = await getCountriesByRegion("Europe");
    expect(countries).toEqual([mockCountries[1]]);
  });

  test("getCountryByCode returns country details for valid code", async () => {
    const country = await getCountryByCode("USA");
    expect(country).toEqual(mockCountries[0]);
  });

  test("getCountryByCode throws error for invalid code", async () => {
    await expect(getCountryByCode("XYZ")).rejects.toThrow();
  });
});
