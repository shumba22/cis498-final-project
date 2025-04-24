"use client";

import { FiSearch as Search } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="bg-white rounded-lg shadow-lg p-4 flex">
        <div className="flex-grow flex items-center border rounded-l-lg px-4 bg-[#F8F8F8]">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Products..."
            className="w-full p-2 bg-transparent focus:outline-none text-gray-700"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#FF4500] text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mt-4">
          <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      )}

{/* Results */}
{!loading && results.length > 0 && (
  <ul className="mt-6 bg-white rounded-lg shadow-lg p-4 space-y-2">
    {results.map((product) => (
      <li key={product.id} className="border-b py-1 text-gray-700">
        <strong>{product.name}</strong><br />
        <span className="text-sm text-gray-500">{product.description}</span>
      </li>
    ))}
  </ul>
)}


      {/* 🥲 No results */}
      {!loading && query && results.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No Products found.</p>
      )}
    </div>
  );
}
