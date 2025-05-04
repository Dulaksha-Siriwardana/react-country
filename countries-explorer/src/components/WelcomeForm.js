import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getAllCountries } from "../service/api";

const WelcomeForm = ({ onComplete }) => {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries for dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        // Sort countries alphabetically
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountryOptions(sortedCountries);
        setError(null);
      } catch (err) {
        setError("Failed to load countries. Please refresh the page.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !country) {
      return;
    }

    const selectedCountry = countryOptions.find((c) => c.cca3 === country);

    setUser({
      name: name.trim(),
      country: selectedCountry,
    });

    onComplete();
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome to Countries Explorer
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block text-gray-700 mb-2">
            Your Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your country</option>
            {countryOptions.map((country) => (
              <option key={country.cca3} value={country.cca3}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start Exploring
        </button>
      </form>
    </div>
  );
};

export default WelcomeForm;
