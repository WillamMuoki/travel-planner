 import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import { searchDestinations } from "./api/amadeus";

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchDestinations(query);
      setDestinations(results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to search destinations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Travel Planner
          </h1>
          <p className="mt-2 text-gray-600">
            Search destinations, view offers, and plan trips.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-8">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!loading && destinations.length === 0 && (
            <p className="text-center text-gray-500">Try searching a city (e.g., Nairobi)</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built with ❤️ for the Capstone Project</p>
          <p className="mt-1">
            <Link to="/"
              className="text-blue-600 hover:underline"
            >
              Home
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
