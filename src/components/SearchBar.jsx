 import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={submit} className="mt-8 flex justify-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations (e.g., Paris, Nairobi)"
        className="w-full max-w-xl border border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button className="bg-blue-600 text-white px-5 rounded-r-md">Search</button>
    </form>
  );
}
