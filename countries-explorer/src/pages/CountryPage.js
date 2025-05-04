
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CountryDetail from "../components/CountryDetail";
import { getCountryByCode } from "../service/api";

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch country details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-xl">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CountryDetail country={country} />
    </div>
  );
};

export default CountryPage;