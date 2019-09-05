import { View } from 'components/Base';
import { defCoordinates, ILatLng } from 'core';
import { constituencies } from 'core/data';
import React, { CSSProperties, PureComponent } from 'react';
import { GoogleMap } from 'react-google-maps';
import { fullScreen, horizontalCenter, IStyles } from 'styles';
import { gLatLngToILatLng, Log } from 'utils';
import Brands from './components/Brands';
import ConstituencyMap from './components/ConstituencyMap';
const log = Log('screens.MapScreen');

interface IProps {
  style?: CSSProperties;
}

interface IState {
  center: ILatLng;
  zoom: number;
}

export default class MapScreen extends PureComponent<IProps, IState> {
  private map?: GoogleMap;

  state = {
    center: defCoordinates.kremen.loc,
    zoom: defCoordinates.kremen.zoom,
  };

  private onMapRef = (map: GoogleMap | null) => {
    if (!map || this.map) { return; }
    this.map = map;
  }

  private onMapClick = (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => {
    log.debug('map click, loc=', e.latLng);
  }

  private onMapCenterChange = () => {
    if (!this.map) { return; }
    const center = gLatLngToILatLng(this.map.getCenter());
    this.setState({ center });
  }

  private onMapZoomChange = () => {
    if (!this.map) { return; }
    const zoom = this.map.getZoom();
    this.setState({ zoom });
  }

  render() {
    const { style } = this.props;
    const { center, zoom } = this.state;
    return (
      <View style={[ styles.container, style ]}>
        <ConstituencyMap
          style={styles.map}
          mapRef={this.onMapRef}
          defaultCenter={center}
          defaultZoom={zoom}
          constituencies={constituencies}
          center={center}
          zoom={zoom}
          onMapClick={this.onMapClick}
          onMapCenterChange={this.onMapCenterChange}
          onMapZoomChange={this.onMapZoomChange}
        />
        <Brands style={styles.brands} />
      </View>
    );
  }
}

const styles: IStyles = {
  container: {
    ...fullScreen,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  sidebarWrap: {
    padding: 20,
    height: '100%',
  },
  brands: {
    ...horizontalCenter,
    position: 'absolute',
    bottom: '10px',
  },
};
