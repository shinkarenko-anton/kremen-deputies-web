// React
import React from 'react';
import PropTypes from 'prop-types';
// UI
import { Marker } from 'react-google-maps';

// PropTypes
const propTypes = {
  position: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

// DefaultProps
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
    return (
      <Marker
        position={this.props.position}
        label={this.props.label}
      />
    );
  }
}

// Attach prop types

ConstituencyMarker.propTypes = propTypes;
ConstituencyMarker.defaultProps = defaultProps;

export default ConstituencyMarker;
