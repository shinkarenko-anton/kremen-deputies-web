// Utils
import _ from 'lodash';
// React
import React from 'react';
import PropTypes from 'prop-types';
// Google Map
import { withGoogleMap, GoogleMap } from 'react-google-maps';
// Elements
import Polygon from './polygon';
import Marker from './marker';

// Consts
const KREMEN_CENTER_LOCATION = { lat: 49.07041247214882, lng: 33.42281959697266 };

// Prop types

const propTypes = {
  constituencies: PropTypes.array.isRequired,
  selected: PropTypes.bool,
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.object,

  onMapLoad: PropTypes.func.isRequired,
  onMapClick: PropTypes.func.isRequired,
  onMapResize: PropTypes.func.isRequired,
  onMapCenterChanged: PropTypes.func.isRequired,
  onMapZoomChanged: PropTypes.func.isRequired,

  onConstituencyClick: PropTypes.func.isRequired,
  onConstituencyDblClick: PropTypes.func.isRequired,
  onConstituencyChange: PropTypes.func.isRequired,
};

const defaultProps = {
  defaultZoom: 13,
  defaultCenter: KREMEN_CENTER_LOCATION,
  selected: false,
};

// ConstituenciesMap

function ConstituenciesMap(props) {
  // Props
  const {
    constituencies,
    selected,
    onConstituencyClick,
    onConstituencyDblClick,
    onConstituencyChange,
  } = props;
  // Options
  const mapOptions = {
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_LEFT,
    },
  };


  const elements = [];

  _.each(constituencies, (item) => {
    _.each(item.polygons, (polygon, index) => {
      const polygonComponent = (
        <Polygon
          key={`polygon-${item.id}-${index}`}
          polygon={polygon}
          editable={props.editable && selected && (selected.id === item.id)}
          onChange={(e, path) => {
            const newItem = _.clone(item);
            newItem.polygons[index] = path;
            onConstituencyChange(e, newItem);
          }}
          onClick={e => onConstituencyClick(e, item)}
          onDblClick={e => onConstituencyDblClick(e, item)}
        />
      );
      elements.push(polygonComponent);
    });
    _.each(item.markers, (marker, index) => {
      const markerComponent = (
        <Marker
          key={`marker-${item.id}-${index}`}
          position={marker}
          label={item.number.toString()}
        />
      );
      elements.push(markerComponent);
    });
  });

  return (
    <GoogleMap
      ref={map => props.onMapLoad(map)}
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}
      options={mapOptions}
      onClick={e => props.onMapClick(e)}
      onResize={e => props.onMapResize(e)}
      onCenterChanged={e => props.onMapCenterChanged(e)}
      onZoomChanged={e => props.onMapZoomChanged(e)}
    >
      {elements}
    </GoogleMap>
  );
}

ConstituenciesMap.propTypes = propTypes;
ConstituenciesMap.defaultProps = defaultProps;

export default withGoogleMap(props => (<ConstituenciesMap {...props} />));
