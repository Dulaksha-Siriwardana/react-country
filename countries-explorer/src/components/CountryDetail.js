import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CountryDetail = ({ country }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Simply navigate back to home page - no flag needed now
    navigate("/");
  };

  if (!country) return <div className="text-center py-10">Loading...</div>;

  // Format population with commas
  const formattedPopulation = country.population.toLocaleString();

  // Get languages as an array
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div className="p-4">
      <button
        onClick={handleBack}
        className="inline-flex items-center px-4 py-2 bg-gray-200 rounded mb-8 hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div>
              <p className="mb-1">
                <span className="font-semibold">Official Name:</span>{" "}
                {country.name.official}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Population:</span>{" "}
                {formattedPopulation}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital && country.capital[0]}
              </p>
            </div>

            <div>
              {country.currencies && (
                <p className="mb-1">
                  <span className="font-semibold">Currencies:</span>{" "}
                  {Object.values(country.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(", ")}
                </p>
              )}

              {languages.length > 0 && (
                <p className="mb-1">
                  <span className="font-semibold">Languages:</span>{" "}
                  {languages.join(", ")}
                </p>
              )}
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="px-4 py-1 bg-white shadow rounded text-sm hover:bg-gray-100"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
