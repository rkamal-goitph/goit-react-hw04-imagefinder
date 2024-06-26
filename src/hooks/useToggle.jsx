import { useState } from 'react';

export const useToggle = (initialState = false) => {
  const [showModal, setShowModal] = useState(initialState);

  const toggle = () => setShowModal(!showModal);

  return { showModal, toggle };
};
