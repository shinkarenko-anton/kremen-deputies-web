// React
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// Google Maps
import { Polygon } from 'react-google-maps';
// Theme
import colors from '../../../shared/Theme/Colors';

// PropTypes
const propTypes = {
  polygon: PropTypes.object.isRequired,
  editable: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDblClick: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {
  editable: false,
};

// ConstituencyPoligon
class ConstituencyPoligon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    // Lifecycle hooks

  componentDidMount() {

  }

  componentWillUnmount() {
    this.polygon = null;
  }

    // Element

  handlePolygon(polygon) {
    if (!polygon) return;
    this.polygon = polygon;

    const updateConstituencyPath = () => {
      const newPolygonData = {};
      _.each(polygon.getPaths().getArray(), (path, index) => {
        const newPath = _.map(path.getArray(), item => (
          { lat: item.lat(), lng: item.lng() }
        ));
        if (index === 0) newPolygonData.outer = newPath;
        if (index === 1) newPolygonData.inner = newPath;
      });

      this.props.onChange(null, newPolygonData);
    };

    _.each(polygon.getPaths().getArray(), (path) => {
      path.addListener('set_at', () => {
        updateConstituencyPath();
      });

      path.addListener('remove_at', () => {
        updateConstituencyPath();
      });

      path.addListener('insert_at', () => {
        updateConstituencyPath();
      });
    });
  }

    // Render

  render() {
        // Constituency
    const polygon = this.props.polygon;
    if (!polygon) return null;

    const paths = [];
    if (polygon.outer) {
      paths.push(polygon.outer);
    }
    if (polygon.inner) {
      paths.push(polygon.inner);
    }

    return (
      <Polygon
        ref={el => this.handlePolygon(el)}
        paths={paths}
        editable={this.props.editable}
        draggable={false}
        options={{
          strokeColor: colors.blue,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: colors.blue,
          fillOpacity: 0.1,
        }}
        onClick={e => this.props.onClick(e)}
        onDblClick={e => this.props.onDblClick(e)}
      />
    );
  }
}

ConstituencyPoligon.propTypes = propTypes;
ConstituencyPoligon.defaultProps = defaultProps;

export default ConstituencyPoligon;

