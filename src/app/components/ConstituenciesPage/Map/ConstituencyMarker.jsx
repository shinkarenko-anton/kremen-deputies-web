// React
import React from 'react';
// UI
import { Marker } from 'react-google-maps';
// Theme
import Colors from '../../../shared/Theme/Colors';

// ConstituencyMarker
export default class ConstituencyMarker extends React.Component {
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
