
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

const FAVORITES_KEY = 'movieshelf-favorites';

function getFavorites() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || '[]'
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useMovies();

  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    setIsFavorite(
      getFavorites().some(item => item.id === movie.id)
    );
  }, [movie.id]);

  function toggleFavorite() {
    const favorites = getFavorites();

    const updated = isFavorite
      ? favorites.filter(item => item.id !== movie.id)
      : [...favorites.filter(item => item.id !== movie.id), movie];

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updated)
    );

    setIsFavorite(!isFavorite);
  }

  function toggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Poster'
          }
          alt={movie.title}
        />
      </Link>

      <div className="movie-info">
        <Link
          to={`/movie/${movie.id}`}
          className="movie-title-link"
        >
          <h3 className="movie-title">{movie.title}</h3>
        </Link>

        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {typeof movie.vote_average === 'number'
              ? movie.vote_average.toFixed(1)
              : 'N/A'}
          </span>

          <span className="movie-year">
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : 'Unknown'}
          </span>
        </div>

        <div className="movie-actions">
          <button
            type="button"
            className="favorite-button"
            onClick={toggleFavorite}
          >
            {isFavorite
              ? '♥ Remove Favorite'
              : '♡ Add to Favorites'}
          </button>

          <button
            type="button"
            className="watchlist-button"
            onClick={toggleWatchlist}
          >
            {inWatchlist
              ? '✓ Remove from Watchlist'
              : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;



