import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ image, tags, onClose }) => {
  // Assign a reference to the onClose prop to stabilize its value
  const onCloseRef = useRef(onClose);

  // Update the ref to the latest onClose function on every render
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    // Define handleKeyDown without having to add it in the dependency array
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array

  // Render the modal content
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={image} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
