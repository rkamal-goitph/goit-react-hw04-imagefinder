import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { getAPI } from 'pixabay-api';
import toast from 'react-hot-toast';

const ImagesContext = createContext();

export const useImages = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === '') {
      alert(`Empty string is not a valid search query. Please type again.`);
      return;
    }

    if (normalizedQuery === searchQuery) {
      alert(
        `Search query is the same as the previous one. Please provide a new search query.`
      );
      return;
    }

    setSearchQuery(normalizedQuery);
    setCurrentPage(1);
    setImages([]);
    setIsEnd(false);
  };

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

  const uniqueTags = useMemo(() => {
    console.log('Calculating unique tags...');
    const tagSet = new Set();
    images.forEach(image => {
      image.tags.split(', ').forEach(tag => tagSet.add(tag));
    });
    console.log('Unique tags calculated:', Array.from(tagSet));
    return Array.from(tagSet);
  }, [images]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        isLoading,
        isError,
        isEnd,
        handleSearchSubmit,
        handleLoadMore,
        uniqueTags, // provide the unique tags in the context
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
