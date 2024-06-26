import React, { createContext, useState, useContext } from 'react';

const SearchQueryContext = createContext();

export const useSearchQuery = () => useContext(SearchQueryContext);

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === '') {
      alert('Empty string is not a valid search query. Please type again.');
      return;
    }

    if (normalizedQuery === searchQuery) {
      alert(
        'Search query is the same as the previous one. Please provide a new search query.'
      );
      return;
    }

    setSearchQuery(normalizedQuery);
  };

  return (
    <SearchQueryContext.Provider value={{ searchQuery, handleSearchSubmit }}>
      {children}
    </SearchQueryContext.Provider>
  );
};
