 // src/components/DestinationCard.jsx
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/destination/${destination.id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">
            {destination.title}
          </h2>
          <p className="text-sm text-gray-500">{destination.country}</p>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {destination.description}
          </p>
          <p className="mt-3 text-blue-600 font-semibold">
            {destination.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
