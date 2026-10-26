
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

async function fetchMovies(endpoint) {
  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Could not load movies. Please try again.");
  }

  return response.json();
}

export async function getPopularMovies() {
  return fetchMovies("/movie/popular");
}

export async function searchMovies(query) {
  const url = `/search/movie?query=${encodeURIComponent(query)}`;
  return fetchMovies(url);
}
