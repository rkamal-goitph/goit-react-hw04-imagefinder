import React from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import styles from './App.module.css';
import { Toaster } from 'react-hot-toast';
import { useImages } from 'context/ImagesContext';
import { useSearchQuery } from 'context/SearchQueryContext';
import { usePagination } from 'context/PaginationContext';

const App = () => {
  const { images, isLoading, isError } = useImages();
  const { handleSearchSubmit } = useSearchQuery();
  const { handleLoadMore, isEnd } = usePagination();

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore} />
      )}
      {isError && <p>Something went wrong. Please try again later.</p>}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
