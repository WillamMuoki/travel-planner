 import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">Travel Planner</Link>
        <div className="flex gap-4 items-center text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <a href="#itinerary" className="hover:text-blue-600">Itinerary</a>
          <a href="#about" className="hover:text-blue-600">About</a>
        </div>
      </div>
    </nav>
  );
}
