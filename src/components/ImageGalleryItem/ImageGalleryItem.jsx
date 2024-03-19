import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';
import { useToggle } from 'hooks/useToggle';

const ImageGalleryItem = ({ image }) => {
  const { isOpen, toggle } = useToggle();
  const { webformatURL, largeImageURL, tags } = image;

  return (
    <li className={styles.galleryItem} onClick={toggle}>
      <img src={webformatURL} alt={tags} />
      {isOpen && <Modal image={largeImageURL} tags={tags} onClose={toggle} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};

export default ImageGalleryItem;
