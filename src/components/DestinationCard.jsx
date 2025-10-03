 import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  // destination shape: { id, name, country, cityCode, description, imageUrl }
  const { id, name, country, imageUrl, description } = destination;
  return (
    <Link to={`/destination/${encodeURIComponent(id)}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
        ) : (
          <div className="w-full h-40 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{country}</p>
          {description && <p className="mt-2 text-sm text-gray-600">{description.slice(0, 80)}{description.length>80 ? "..." : ""}</p>}
        </div>
      </div>
    </Link>
  );
}
