import React, { Component } from 'react';
import { GridLoader } from 'react-spinners';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <GridLoader
          color={'#3f51b5'}
          loading={true}
          margin={5}
          width={11}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
}

export default Loader;
