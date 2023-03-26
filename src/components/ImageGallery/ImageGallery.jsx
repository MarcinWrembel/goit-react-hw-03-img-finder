import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import React, { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { imagesArr, showModal } = this.props;

    return (
      <ul className={css.imageGallery}>
        {imagesArr.map(({ webformatURL, largeImageURL, id, tags }) => (
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            key={id}
            showMod={showModal}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
