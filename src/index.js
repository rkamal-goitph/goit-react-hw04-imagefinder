import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { ImagesProvider } from 'context/ImagesContext';
import { SearchQueryProvider } from 'context/SearchQueryContext';
import { PaginationProvider } from 'context/PaginationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchQueryProvider>
      <PaginationProvider>
        <ImagesProvider>
          <App />
        </ImagesProvider>
      </PaginationProvider>
    </SearchQueryProvider>
  </React.StrictMode>
);
