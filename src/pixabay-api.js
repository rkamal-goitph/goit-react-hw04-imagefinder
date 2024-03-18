import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41258265-293e4bea479457c1d7a454ddf';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
};