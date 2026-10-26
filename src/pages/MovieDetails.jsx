
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/movieService';
import MovieCard from '../components/MovieCard';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadMovie() {
      setLoading(true);
      setError('');

      try {
        const data = await getMovieDetails(id);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMovie();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <main className="movie-details-page">Loading movie...</main>;
  }

  if (error) {
    return <main className="movie-details-page">{error}</main>;
  }

  if (!movie) {
    return <main className="movie-details-page">Movie not found.</main>;
  }

  return (
    <main className="movie-details-page">
      <Link to="/">← Back to Movies</Link>

      <div className="movie-details-layout">
        <div className="details-card">
          <MovieCard movie={movie} />
        </div>

        <div className="movie-details-text">
          <h1>{movie.title}</h1>

          <p>
            <strong>Release Date:</strong>{' '}
            {movie.release_date || 'Unknown'}
          </p>

          <p>
            <strong>Rating:</strong> ⭐{' '}
            {typeof movie.vote_average === 'number'
              ? movie.vote_average.toFixed(1)
              : 'N/A'}
          </p>

          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.map(genre => genre.name).join(', ')
              || 'Unknown'}
          </p>

          <h3>Overview</h3>
          <p>{movie.overview || 'No description available.'}</p>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;


