import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-white">404</h1>
      <p className="mt-4 text-lg text-gray-400 max-w-md">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
