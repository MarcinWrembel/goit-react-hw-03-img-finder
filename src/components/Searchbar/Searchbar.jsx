import React, { Component } from 'react';
import css from './Searchbar.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';

axios.defaults.baseURL = `https://pixabay.com/api/?`;

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const value = this.state.value;

    if (value.trim() !== '' && this.props.query !== value) {
      this.props.onFormSubmit(this.state.value);
    } else if (value.trim() === '') {
      toast.info('Please enter any query', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
      return;
    }
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
};
