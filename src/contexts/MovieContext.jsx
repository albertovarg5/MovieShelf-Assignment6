
import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext(null);

const STORAGE_KEY = 'movieshelf-watchlists';

const DEFAULT_LISTS = {
  wantToWatch: [],
  watching: [],
  watched: [],
};

export function MovieProvider({ children }) {
  const [watchlists, setWatchlists] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_LISTS,
          ...parsed,
        };
      }

      const oldWatchlist = JSON.parse(
        localStorage.getItem('movieshelf-watchlist') || '[]'
      );

      return {
        ...DEFAULT_LISTS,
        wantToWatch: Array.isArray(oldWatchlist) ? oldWatchlist : [],
      };
    } catch {
      return DEFAULT_LISTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlists));
  }, [watchlists]);

  function addToList(movie, listName = 'wantToWatch') {
    if (!Object.hasOwn(DEFAULT_LISTS, listName)) return;

    setWatchlists((previous) => {
      if (previous[listName].some((item) => item.id === movie.id)) {
        return previous;
      }

      return {
        ...previous,
        [listName]: [...previous[listName], movie],
      };
    });
  }

  function removeFromList(movieId, listName = 'wantToWatch') {
    if (!Object.hasOwn(DEFAULT_LISTS, listName)) return;

    setWatchlists((previous) => ({
      ...previous,
      [listName]: previous[listName].filter(
        (movie) => movie.id !== movieId
      ),
    }));
  }

  function isInList(movieId, listName = 'wantToWatch') {
    return (watchlists[listName] || []).some(
      (movie) => movie.id === movieId
    );
  }

  function moveToList(movie, listName) {
    if (!Object.hasOwn(DEFAULT_LISTS, listName)) return;

    setWatchlists((previous) => {
      const updated = {};

      for (const key of Object.keys(DEFAULT_LISTS)) {
        updated[key] = previous[key].filter(
          (item) => item.id !== movie.id
        );
      }

      updated[listName].push(movie);
      return updated;
    });
  }

  return (
    <MovieContext.Provider
      value={{
        watchlists,
        watchlist: watchlists.wantToWatch,
        addToWatchlist: (movie) => addToList(movie),
        removeFromWatchlist: (id) => removeFromList(id),
        isInWatchlist: (id) => isInList(id),
        addToList,
        removeFromList,
        isInList,
        moveToList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovies must be used inside MovieProvider');
  }

  return context;
}

