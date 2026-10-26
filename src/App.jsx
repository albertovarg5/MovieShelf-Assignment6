
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  async function handleSearch(query) {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  }

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />

        <Routes>
          <Route
            path="/"
            element={<Home searchResults={searchResults} />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
