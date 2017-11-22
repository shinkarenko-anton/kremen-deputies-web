// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Marker } from 'react-google-maps';
// Styles
import { colors } from 'styles';

// Assets

import pinIcon from 'assets/img/icons/pin.svg';

// Prop types

const propTypes = {
  position: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {

};

// ConstituencyMarker

class ConstituencyMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render

  render() {
    // Props
    const {
      label,
      position,
    } = this.props;
    // Icon
    const icon = {
      url: pinIcon,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(30, 49),
      labelOrigin: {
        x: 15,
        y: 16,
      }
    };
    const labelOpt = {
      text: label,
      color: colors.white,
    }
    // Render
    return (
      <Marker
        position={position}
        label={labelOpt}
        icon={icon}
      />
    );
  }
}

// Styles

const styles = {

}

// Attach prop types

ConstituencyMarker.propTypes = propTypes;
ConstituencyMarker.defaultProps = defaultProps;

export default ConstituencyMarker;
