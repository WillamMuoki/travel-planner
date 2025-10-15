 // src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          ✈️ Travel<span className="text-yellow-300">Planner</span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-yellow-300 transition">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-yellow-300 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
