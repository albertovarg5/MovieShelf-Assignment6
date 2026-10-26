
import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'movieshelf-favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
}

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some((item) => item.id === movie.id));
  }, [movie.id]);

  function toggleFavorite() {
    const favorites = getFavorites();

    const updated = isFavorite
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Poster'
          }
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}
          </span>

          <span className="movie-year">
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : 'Unknown'}
          </span>
        </div>

        <button
          className="favorite-button"
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove Favorite' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;


