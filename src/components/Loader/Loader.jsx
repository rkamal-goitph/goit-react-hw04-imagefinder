import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.Loader}>
        <div className={styles.loaderBox}>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      </div>
    );
  }
}

export default Loader;
