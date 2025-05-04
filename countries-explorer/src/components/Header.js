import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          Countries Explorer
        </Link>

        {user && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">Hello, {user.name}</span>
            {user.country && user.country.flags && (
              <img
                src={user.country.flags.svg || user.country.flags.png}
                alt={`${user.country.name.common} flag`}
                className="h-6 w-auto rounded shadow-sm"
                title={user.country.name.common}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
