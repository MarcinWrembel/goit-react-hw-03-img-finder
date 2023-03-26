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

let params = '';

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

  handleSubmit = async (query, firstPage) => {
    if (this.state.query !== query) {
      this.setState({ query, images: [], page: 1, isLastPage: false });
      params = `/?q=${query}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`;
    } else
      params = `/?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`;

    //starts with loading status
    this.setState({ isLoading: true });

    try {
      //invoking fetching images
      const images = await fetchImages(params);

      //setting new state values
      this.setState({
        images: images.hits,
        totalHits: images.totalHits,
        isLastPage: this.checkIfLastPage(images.totalHits),
      });

      //changing state and add new images to existing ones on load more btn
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
      //handling error
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
      // changing state for laoder independently on promise (fetchImages) return
      this.setState({ isLoading: false });
    }
  };

  //method to return isLastPage (boolean) basing on number of hits for searching
  checkIfLastPage = totalHits => {
    const noOfPages = Math.ceil(totalHits / this.state.perPage);
    const isLastPage = noOfPages === this.state.page;

    return isLastPage;
  };

  //method to show modal basing on isModalVisible state value
  showModal = largeImg => {
    this.setState({ isModalVisible: true, largeImageURL: largeImg });
  };

  //method to show modal basing on isModalVisible state value
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

  //method to show info if maximum number of images is loaded
  messageIfMax = () => {
    toast.info("You've have reached maximum number of images ", {
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
