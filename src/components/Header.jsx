
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSearch(event) {
    event.preventDefault();

    if (onSearch) {
      onSearch(query.trim());
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>

        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
