// src/components/ImageGalleryItem/ImageGalleryItem.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;

    return (
      <li className={styles.galleryItem} onClick={this.toggleModal}>
        <img src={webformatURL} alt={tags} />
        {showModal && (
          <Modal image={largeImageURL} tags={tags} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
