import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Get all countries with specific fields
export const getAllCountries = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/all?fields=name,population,region,languages,flags,capital,cca3`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};
// Search countries by name
export const getCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching for "${name}":`, error);
    return [];
  }
};