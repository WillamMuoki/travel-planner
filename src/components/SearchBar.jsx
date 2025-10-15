 // src/components/SearchBar.jsx
import React from "react";
 
// src/components/SearchBar.jsx
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
