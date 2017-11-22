// Utils
import _ from 'lodash';
// React
import React from 'react';
import PropTypes from 'prop-types';
// Google Map
import { withGoogleMap, GoogleMap } from 'react-google-maps';
// Components
import Polygon from './polygon';
import Marker from './marker';
// Consts
import { COORDINATES } from 'consts';

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
  defaultCenter: COORDINATES.KREMENCHUK,
  selected: false,
  onMapClick: () => {},
  onMapCenterChanged: () => {},
  onMapZoomChanged: () => {},
  onConstituencyClick: () => {},
  onConstituencyDblClick: () => {},
  onConstituencyChange: () => {},
};

// ConstituenciesMap

function ConstituenciesMap(props) {
  // Props
  const {
    items,
    selected,
    onConstituencyClick,
    onConstituencyDblClick,
    onConstituencyChange,
  } = props;
  // Options
  const mapOptions = {
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  };
  // Elements
  const elements = [];

  _.each(items, (item) => {
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

// Attach prop types

ConstituenciesMap.propTypes = propTypes;
ConstituenciesMap.defaultProps = defaultProps;

export default withGoogleMap(props => (<ConstituenciesMap {...props} />));
