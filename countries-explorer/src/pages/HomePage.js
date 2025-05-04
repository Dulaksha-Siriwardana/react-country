import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import CountryCard from "../components/CountryCard";
import {
  getAllCountries,
  getCountriesByName,
  getCountriesByRegion,
} from "../service/api";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all countries when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      // If search is empty, reset to all countries
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountriesByName(searchTerm);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError("No countries found matching your search.");
    } finally {
      setLoading(false);
    }
  };

  // Handle region filter
  const handleRegionChange = async (region) => {
    if (!region) {
      // If no region selected, reset to all countries
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountriesByRegion(region);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(
        `Failed to fetch countries from ${region}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-4">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onRegionChange={handleRegionChange} />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl">Loading countries...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
