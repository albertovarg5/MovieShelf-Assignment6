
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const displayedMovies = searchResults ?? movies;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults !== null && searchResults !== undefined
          ? 'Search Results'
          : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading || searchResults != null ? (
        <MovieGrid movies={displayedMovies} />
      ) : null}

      {searchResults?.length === 0 && (
        <p>No movies found. Try another search.</p>
      )}
    </main>
  );
}

export default Home;

