
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

const LIST_NAMES = {
  wantToWatch: 'Want to Watch',
  watching: 'Currently Watching',
  watched: 'Watched',
};

function Watchlist() {
  const [activeList, setActiveList] = useState('wantToWatch');

  const {
    watchlists,
    removeFromList,
    moveToList,
  } = useMovies();

  const movies = watchlists[activeList] || [];

  return (
    <main className="watchlist-page">
      <h1>My Watchlists</h1>
      <p>Organize your movies and track what you watch.</p>

      <div className="watchlist-tabs">
        {Object.entries(LIST_NAMES).map(([key, name]) => (
          <button
            key={key}
            className={
              activeList === key
                ? 'watchlist-tab active'
                : 'watchlist-tab'
            }
            onClick={() => setActiveList(key)}
          >
            {name} ({watchlists[key].length})
          </button>
        ))}
      </div>

      {movies.length === 0 ? (
        <div className="empty-watchlist">
          <h2>No movies in this list yet.</h2>
          <p>Find movies on the Home page and save them.</p>
          <Link to="/">Browse Movies</Link>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
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
                  <h3>{movie.title}</h3>
                </Link>

                <label htmlFor={`move-${movie.id}`}>
                  Move to:
                </label>

                <select
                  id={`move-${movie.id}`}
                  value={activeList}
                  onChange={(event) =>
                    moveToList(movie, event.target.value)
                  }
                  className="watchlist-select"
                >
                  {Object.entries(LIST_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>

                <button
                  className="watchlist-button"
                  onClick={() =>
                    removeFromList(movie.id, activeList)
                  }
                >
                  Remove from List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Watchlist;

