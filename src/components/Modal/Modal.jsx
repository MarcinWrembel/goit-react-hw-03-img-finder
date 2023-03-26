import React, { Component } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleClose);
  }

  handleClose = event => {
    if (event.code === 'Escape') {
      return this.props.hideMod();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.props.hideMod}>
        <div className={css.modal}>
          <img src={this.props.largeImg} alt="result" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
    largeImg: propTypes.string,
  };
  
