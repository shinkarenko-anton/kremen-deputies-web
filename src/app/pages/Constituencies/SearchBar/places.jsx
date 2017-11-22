// Utils
import _ from 'lodash';
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
// Consts
import { COORDINATES } from 'consts';

// Prop types
const propTypes = {
  style: PropTypes.any,
};

// Default prop types
const defaultProps = {
  style: null,
  onPlaceSelected: () => {},
  onPlaceChanged: () => {},
};

// Places
class Places extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
    }
  }

  // Lifecycle

  componentDidMount(){
    
  }

  componentWillUnmount(){
    
  }

  // Events

  onSelect = (value, placeId) => {
    const { onPlaceSelected } = this.props;
    this.setState({value});
    geocodeByPlaceId(placeId)
      .then(results => {
        if(results && results.length){
          const data = results[0];
          const lat = data.geometry.location.lat();
          const lng = data.geometry.location.lng();
          const coordinates = {lat, lng};
          onPlaceSelected({...data, coordinates});
        }
      });
  }

  // Render

  render(){
    // Props
    const { 
      style,
      value,
      onPlaceChanged,
    } = this.props;
    // Options
    const options = {
      location: new google.maps.LatLng(COORDINATES.KREMENCHUK.lat, COORDINATES.KREMENCHUK.lng),
      radius: 22000,
    };
    // Render
    return (
      <div style={style}>
        <PlacesAutocomplete 
          styles={styles.autocomplete}
          options={options}
          inputProps={{
            value,
            onChange: onPlaceChanged,
            placeholder: 'Пошук за адресою'
          }}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

// Styles

const styles = {
  autocomplete: {
    input: {
      display: 'inline-block',
      width: '100%',
      padding: '10px',
      border: 'none',
      fontSize: '15px',
      outline: 'none',
    },
    autocompleteContainer: {
      position: 'absolute',
      top: '100%',
      backgroundColor: 'white',
      width: '100%',
      border: '1px solid #fafafa',
    },
    autocompleteItem: {
      backgroundColor: '#ffffff',
      padding: '8px',
      color: '#333',
      cursor: 'pointer',
      fontSize: '13px',
      borderBottom: '1px solid #ddd',
    },
    googleLogoContainer: {
      textAlign: 'right',
      padding: '10px',
      backgroundColor: '#fafafa'
    },
  }
}

// Attach prop types
Places.propTypes = propTypes;
Places.defaultProps = defaultProps;

export default Places;
