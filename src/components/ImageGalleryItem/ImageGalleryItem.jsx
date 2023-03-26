import css from './ImageGalleryItem.module.css';

import React from 'react';

const ImageGalleryItem = props => {
  const { webformatURL, id, tags, largeImageURL, showMod } = props;

  return (
    <li className={css.imageGalleryItem} key={id}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={()=> showMod(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
