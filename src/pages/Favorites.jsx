
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem('movieshelf-favorites');

    if (savedMovies) {
      try {
        setMovies(JSON.parse(savedMovies));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setMovies([]);
      }
    }
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorite Movies</h2>
        <p>Your personal collection of favorite films</p>
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p>You haven't added any favorite movies yet.</p>
      )}
    </main>
  );
}

export default Favorites;

