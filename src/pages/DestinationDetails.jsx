import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MOCK_DESTINATIONS } from "../api/mockData";
import { searchDestinations } from "../api/amadeus";

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      // First try to find in mock data (fast)
      const fromMock = MOCK_DESTINATIONS.find((m) => m.id === id || encodeURIComponent(m.id) === id);
      if (fromMock) {
        setDestination(fromMock);
        setLoading(false);
        return;
      }

      // Otherwise, try to fetch full info using searchDestinations (Amadeus or fallback)
      try {
        const results = await searchDestinations(id);
        const found = results.find(r => r.id === id || encodeURIComponent(r.id) === id) || results[0];
        if (found) {
          // try to enrich with image or description if missing
          setDestination({
            id: found.id,
            name: found.name,
            country: found.country,
            description: found.description || "",
            imageUrl: found.imageUrl || null,
            cityCode: found.cityCode || found.id
          });
        } else {
          setDestination(null);
        }
      } catch (err) {
        console.error(err);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading destination...</div>;
  if (!destination) return <div className="p-8 text-center">Destination not found. <Link to="/" className="text-blue-600">Go back</Link></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {destination.imageUrl ? (
          <img src={destination.imageUrl} alt={destination.name} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-blue-50 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-blue-600">{destination.name}</h2>
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold">{destination.name}</h1>
          <p className="text-gray-600 mt-1">{destination.country}</p>
          {destination.description && <p className="mt-4 text-gray-700">{destination.description}</p>}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">Flight Offers</h3>
              <p className="text-sm text-gray-500 mt-2">Flight offers will appear here (Week 4 - API integration).</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">Hotels</h3>
              <p className="text-sm text-gray-500 mt-2">Hotel offers will appear here (Week 4 - API integration).</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link to="/" className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Back</Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add to Itinerary</button>
          </div>
        </div>
      </div>
    </div>
  );
}
