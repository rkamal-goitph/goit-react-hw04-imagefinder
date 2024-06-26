import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const PaginationContext = createContext();

export const usePagination = () => useContext(PaginationContext);

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const handleLoadMore = () => {
    if (!isEnd) {
      setCurrentPage(prev => prev + 1);
    } else {
      toast("We're sorry, but you've reached the end of search results.", {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <PaginationContext.Provider
      value={{ currentPage, setCurrentPage, isEnd, setIsEnd, handleLoadMore }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
