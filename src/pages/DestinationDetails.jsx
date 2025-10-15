// src/pages/DestinationDetails.jsx
import { useParams, Link } from "react-router-dom";
import { MOCK_DESTINATIONS as destinations } from "../api/mockData"; // ✅ fixed import name

export default function DestinationDetails() {
  const { id } = useParams();

  // ✅ handle both string and number IDs
  const destination = destinations.find(
    (d) => d.id.toString() === id.toString()
  );

  if (!destination) {
    return (
      <div className="text-center py-10 text-gray-600">
        Destination not found.{" "}
        <Link to="/" className="text-blue-500">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={destination.image || destination.imageUrl} // ✅ supports both keys
        alt={destination.title || destination.name}
        className="w-full h-80 object-cover rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold mt-6">
        {destination.title || destination.name}
      </h1>
      <p className="text-gray-600 text-lg mt-2">{destination.country}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        {destination.description}
      </p>
      {destination.price && (
        <p className="mt-6 text-blue-600 font-bold text-xl">
          {destination.price}
        </p>
      )}
      <Link
        to="/"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
