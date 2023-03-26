import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import fetchImages from '../utils/api';
import ImageGallery from './ImageGallery/ImageGallery';
import key from '../utils/key.json';

import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';

axios.defaults.baseURL = `https://pixabay.com/api`;

const KEY = Object.values(key);

const INITIAL_STATE = {
  images: [],
  query: '',
  page: 1,
  perPage: 12,
  largeImageURL: '',
  isLoading: false,
  error: null,
  isModalVisible: false,
  totalHits: 0,
  isLastPage: false,
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleSubmit = async query => {
    if (this.state.query !== query) {
      this.setState({ query, images: [], page: 1, isLastPage: false });
    }

    //starts with loading status
    this.setState({ isLoading: true });

    const params = `/?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`;

    try {
      const images = await fetchImages(params);
      // console.log(images);
      this.setState({
        images: images.hits,
        totalHits: images.totalHits,
        isLastPage: this.checkIfLastPage(images.totalHits),
      });

      console.log(this.props);

      if (images && images.hits.length > 0) {
        this.setState(() => {
          return {
            images: [...this.state.images, ...images.hits],
            page: this.state.page + 1,
            isLoading: false,
          };
        });
      }
    } catch (error) {
      this.setState({ error });

      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  checkIfLastPage = totalHits => {
    const noOfPages = Math.ceil(totalHits / this.state.perPage);
    const lastPage = noOfPages === this.state.page;

    return lastPage;
  };

  showModal = largeImg => {
    this.setState({ isModalVisible: true, largeImageURL: largeImg });
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false, //!this.state.isModalVisible,
      largeImageURL: '',
    });
  };

  loadMore = async e => {
    e.preventDefault();
    this.handleSubmit(this.state.query);
  };

  messageIfMax = () => {
    toast.info("You've have reached maximumnumber of images ", {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  render() {
    const {
      images,
      isLoading,
      isModalVisible,
      query,
      largeImageURL,
      page,
      totalHits,
      isLastPage,
    } = this.state;

    // console.log('last page:', this.state.isLastPage);
    console.log(page);

    return (
      <div className="App">
        <Searchbar
          onFormSubmit={this.handleSubmit}
          query={query}
          pageNo={page}
        />
        {isLoading && <Loader />}

        <ImageGallery imagesArr={images} showModal={this.showModal} />
        {isModalVisible && (
          <Modal hideMod={this.hideModal} largeImg={largeImageURL} />
        )}
        <ToastContainer />
        {totalHits > 12 && isLastPage === false ? (
          <Button loadMore={this.loadMore} />
        ) : (
          ''
        )}
        {isLastPage === true && this.messageIfMax()}
      </div>
    );
  }
}

export default App;
