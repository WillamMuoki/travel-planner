 import axios from "axios";
import { MOCK_DESTINATIONS } from "./mockData";

const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;
const AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const LOCATIONS_URL = "https://test.api.amadeus.com/v1/reference-data/locations";

let cachedToken = null;
let tokenExpiry = 0;

async function fetchAccessToken() {
  // If no client id/secret, skip and let caller use mocks
  if (!CLIENT_ID || !CLIENT_SECRET) return null;

  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);

  try {
    const res = await axios.post(AUTH_URL, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = res.data;
    cachedToken = data.access_token;
    tokenExpiry = now + (data.expires_in - 60) * 1000; // refresh 60s earlier
    return cachedToken;
  } catch (err) {
    console.error("Failed to fetch Amadeus token:", err?.response?.data || err.message);
    return null;
  }
}

export async function searchDestinations(query) {
  // If no credentials, return mock filtered by query
  if (!CLIENT_ID || !CLIENT_SECRET) {
    if (!query) return MOCK_DESTINATIONS;
    const q = query.toLowerCase();
    return MOCK_DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
    );
  }

  // With real Amadeus credentials
  const token = await fetchAccessToken();
  if (!token) throw new Error("No Amadeus token available");

  try {
    const res = await axios.get(LOCATIONS_URL, {
      params: {
        keyword: query,
        subType: "CITY"
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Map API response to a simplified shape
    const data = res.data.data || [];
    return data.map(item => ({
      id: item.id || item.self?.id || item.iataCode || item.name,
      name: item.name || item.iataCode || item.address?.cityName || "Unknown",
      country: item.address?.countryName || item.countryCode || "Unknown",
      cityCode: item.iataCode || item.iata_code || item.cityCode || item.name,
      description: item.detailed_name || item.name,
      imageUrl: null
    }));
  } catch (err) {
    console.error("Amadeus locations error:", err?.response?.data || err.message);
    // fallback to mock
    return MOCK_DESTINATIONS;
  }
}
