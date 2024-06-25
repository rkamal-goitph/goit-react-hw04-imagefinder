import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = () => {
  const { image, tags, onClose } = props;

  const onCloseRef = useRef(onClose);

  // Update the ref to the latest onClose function on every render
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleKeyDown = useCallback(e => {
    if (e.code === 'Escape') {
      onCloseRef.current();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
