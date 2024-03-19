import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41258265-293e4bea479457c1d7a454ddf';

const useFetchImages = (query, page) => {
  const [data, setData] = useState({ hits: [], totalHits: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return; // Avoid fetching when query is not set
      setLoading(true);
      try {
        const url = `${BASE_URL}?q=${encodeURIComponent(
          query
        )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await axios.get(url);
        setData({
          hits: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]); // Effect runs when query or page changes

  return { data, loading, error };
};

export default useFetchImages;
