// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./pages/DestinationDetails";
import { MOCK_DESTINATIONS as destinations } from "./api/mockData"; // ✅ fixed import name

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ filter by either title or name to cover all destination formats
  const filtered = destinations.filter((d) =>
    (d.title || d.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
      </Routes>
    </>
  );
}
