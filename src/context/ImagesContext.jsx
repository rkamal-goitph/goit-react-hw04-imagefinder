import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAPI } from 'pixabay-api';
import toast from 'react-hot-toast';
import { useSearchQuery } from './SearchQueryContext';
import { usePagination } from './PaginationContext';

const ImagesContext = createContext();

export const useImages = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { searchQuery } = useSearchQuery();
  const { currentPage, setIsEnd } = usePagination();

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return;

      setIsLoading(true);
      setIsError(false);

      try {
        const response = await getAPI(searchQuery, currentPage);
        const { totalHits, hits } = response;

        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setIsLoading(false);
          return;
        }

        if (currentPage === 1) {
          toast.success(`Hooray! We found ${totalHits} images!`);
        }

        setImages(prev => (currentPage === 1 ? hits : [...prev, ...hits]));
        setIsEnd(currentPage * 12 >= totalHits);
      } catch (error) {
        setIsError(true);
        toast.error('Oops, something went wrong! Reload this page!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage, setIsEnd]);

  return (
    <ImagesContext.Provider value={{ images, isLoading, isError }}>
      {children}
    </ImagesContext.Provider>
  );
};
