// Utils
import _ from 'lodash';
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Google Map
import { withGoogleMap, GoogleMap } from 'react-google-maps';
// Components
import Polygon from './polygon';
import ConstMarker from './marker';
import { Marker } from 'react-google-maps';
// Consts
import { Coordinates } from 'consts';

// Prop types

const propTypes = {
  items: PropTypes.array,
  selected: PropTypes.bool,
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.object,

  onMapClick: PropTypes.func,
  onMapCenterChanged: PropTypes.func,
  onMapZoomChanged: PropTypes.func,

  onConstituencyClick: PropTypes.func,
  onConstituencyDblClick: PropTypes.func,
  onConstituencyChange: PropTypes.func,
};

const defaultProps = {
  items: [],
  defaultZoom: 13,
  defaultCenter: Coordinates.Kremen,
  selected: false,
  onMapClick: () => {},
  onMapCenterChanged: () => {},
  onMapZoomChanged: () => {},
  onConstituencyClick: () => {},
  onConstituencyDblClick: () => {},
  onConstituencyChange: () => {},
};

// ConstituenciesMap

class ConstituenciesMap extends Component{
  constructor(props){
    super(props);
  }

  render() {
    // Props
    const {
      items,
      selected,
      editable,
      addressMarker,
      defaultZoom,
      defaultCenter,
      onMapClick,
      onMapResize,
      onMapCenterChanged,
      onMapZoomChanged,
      onConstituencyClick,
      onConstituencyDblClick,
      onConstituencyChange,
    } = this.props;
    // Options
    const mapOptions = {
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
    };
    // Elements
    const getMapComponents = () => {
      const components = [];
      // Custom marker
      if(addressMarker){
        components.push(
          <Marker
            key={`marker-address`}
            position={addressMarker}
          />
        );
      }
      // Polygons
      _.each(items, (item) => {
        _.each(item.polygons, (polygon, index) => {
          components.push(
            <Polygon
              key={`polygon-${item.id}-${index}`}
              polygon={polygon}
              editable={editable && selected && (selected.id === item.id)}
              onChange={(e, path) => {
                const newItem = _.clone(item);
                newItem.polygons[index] = path;
                onConstituencyChange(e, newItem);
              }}
              onClick={e => onConstituencyClick(e, item)}
              onDblClick={e => onConstituencyDblClick(e, item)}
            />
          );
        });
        // Markers
        _.each(item.markers, (marker, index) => {
          components.push(
            <ConstMarker
              key={`marker-${item.id}-${index}`}
              position={marker}
              label={item.number.toString()}
              onClick={e => onConstituencyClick(e, item)}
            />
          );
        });
      });
      return components;
    }
  
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        options={mapOptions}
        onClick={e => onMapClick(e)}
        onResize={e => onMapResize(e)}
        onCenterChanged={e => onMapCenterChanged(e)}
        onZoomChanged={e => onMapZoomChanged(e)}
      >
        { getMapComponents() }
      </GoogleMap>
    );
  }
}



// Attach prop types

ConstituenciesMap.propTypes = propTypes;
ConstituenciesMap.defaultProps = defaultProps;

export default withGoogleMap(props => (<ConstituenciesMap {...props} />));
