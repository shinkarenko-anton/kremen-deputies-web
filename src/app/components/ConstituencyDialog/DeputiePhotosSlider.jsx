// React
import React from 'react';
import PropTypes from 'prop-types';
// Utils
import _ from 'lodash';

// PropTypes
const propTypes = {
  photos: PropTypes.array,
  style: PropTypes.object,
};

// DefaultProps
const defaultProps = {
  photos: [],
  style: {},
};

// Styles
const containerStyle = {
  textAlign: 'center',
};

const photoImgStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  display: 'inline-block',
};

// DeputiePhotosSlider
function DeputiePhotosSlider(props) {
  const photos = props.photos;
  if (!photos.length) return null;

  return (
    <div style={_.assign({}, containerStyle, props.style)}>
      <img src={photos[0]} style={photoImgStyle} alt="Фото депутата" />
    </div>
  );
}

DeputiePhotosSlider.propTypes = propTypes;
DeputiePhotosSlider.defaultProps = defaultProps;

export default DeputiePhotosSlider;
