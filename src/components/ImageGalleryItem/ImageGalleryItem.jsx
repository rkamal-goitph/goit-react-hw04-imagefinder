import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';
import { useToggle } from 'hooks/useToggle';

const ImageGalleryItem = () => {
  const { image } = props;
  const { isOpen, toggle } = useToggle();
  const { webformatURL, largeImageURL, tags } = image;

  useEffect(() => {
    const gallery = document.querySelector('.js-gallery');
    if (!gallery) return;

    if (isOpen) {
      console.log('Modal is now shown');
      gallery.style.pointerEvents = 'none';
    } else {
      console.log('Modal is now hidden');
      gallery.style.pointerEvents = 'auto';
    }
  }, [isOpen]);

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
