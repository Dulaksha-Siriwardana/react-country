import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  // Format population with commas
  const formattedPopulation = country.population.toLocaleString();

  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {country.name.common}
          </h2>
          <div className="text-sm text-gray-600">
            <p className="mb-1">
              <span className="font-semibold">Population:</span>{" "}
              {formattedPopulation}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital && country.capital[0]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
