import { View } from 'components/Base';
import { defCoord, getDistrictDeputies, IDistrict, ILatLng } from 'core';
import { defDeputies, defDistricts } from 'core/data';
import React, { CSSProperties, MouseEvent, PureComponent } from 'react';
import { GoogleMap } from 'react-google-maps';
import { AppInfoDialog } from 'scenes/App/AppInfoDialog';
import { DistrictDialog, DistrictsMap } from 'scenes/Districts';
import { fullScreen, horizontalCenter, IStyles } from 'styles';
import { gLatLngToILatLng, isPointInsidePoligon, Log } from 'utils';
import Brands from './components/Brands';
import SearchBar from './components/SearchBar';
const log = Log('screens.DistrictsMapScreen');

interface IProps {
  style?: CSSProperties;
}

interface IState {
  center: ILatLng;
  zoom: number;
  districtDialogOpen: boolean;
  districtDialogItem?: IDistrict;
  appInfoDialogOpen?: boolean;
}

export default class DistrictsMapScreen extends PureComponent<IProps, IState> {
  private map?: GoogleMap;

  state: IState = {
    center: defCoord.kremen.loc,
    zoom: defCoord.kremen.zoom,
    districtDialogOpen: false,
    districtDialogItem: undefined,
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

  private onDistrictClick = (item: IDistrict) => {
    log.debug('on district click, item=', item);
    this.setState({ districtDialogOpen: true, districtDialogItem: item });
  }

  private onAboutBtnClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ appInfoDialogOpen: true });
  }

  private onDistrictDialogClose = () => {
    this.setState({ districtDialogOpen: false });
  }

  private onAppInfoDialogClose = () => {
    this.setState({ appInfoDialogOpen: false });
  }

  private onLocationSelect = (val: ILatLng) => {
    log.debug('location selected, val=', val);
    const district = defDistricts.find((item) => {
      const polygon = item.polygons.find((pItem) => isPointInsidePoligon(val, pItem.outer));
      return polygon ? true : false;
    });
    if (district) {
      this.setState({ districtDialogOpen: true, districtDialogItem: district });
    } else {
      alert('За заданою адресою виборчий округ не знайдено');
    }
  }

  render() {
    const { style } = this.props;
    const { center, zoom, districtDialogOpen, districtDialogItem, appInfoDialogOpen } = this.state;
    return (
      <View style={[ styles.container, style ]}>
        <DistrictsMap
          style={styles.map}
          mapRef={this.onMapRef}
          defaultCenter={center}
          defaultZoom={zoom}
          districts={defDistricts}
          center={center}
          zoom={zoom}
          onMapClick={this.onMapClick}
          onMapCenterChange={this.onMapCenterChange}
          onMapZoomChange={this.onMapZoomChange}
          onDistrictClick={this.onDistrictClick}
        >
          <SearchBar
            style={styles.searchBar}
            onLocationSelect={this.onLocationSelect}
          />
        </DistrictsMap>
        <AppInfoDialog
          open={appInfoDialogOpen}
          onClose={this.onAppInfoDialogClose}
        />
        {!!districtDialogItem && (
          <DistrictDialog
            open={districtDialogOpen}
            item={districtDialogItem}
            deputies={getDistrictDeputies(districtDialogItem, defDeputies)}
            onClose={this.onDistrictDialogClose}
          />
        )}
        <View style={styles.footer} column={true} alignItems="center">
          <Brands style={styles.brands} />
          <div style={styles.footerText}>
            <a style={styles.aboutBtn} href="#" onClick={this.onAboutBtnClick}>
              Про додаток
            </a>
            {`  v${VERSION}  `}
            <a href="http://io.kr.ua/" target="__blank">
                IQ Hub &copy; {`${(new Date()).getFullYear()}`} рік.
            </a>
          </div>
        </View>
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
    width: '100%',
    maxWidth: 400,
  },
  sidebarWrap: {
    padding: 20,
    height: '100%',
  },
  footer: {
    ...horizontalCenter,
    position: 'absolute',
    bottom: '10px',
  },
  sidebar: {
    width: 360,
  },
  sidebarContent: {
    height: '100%',
  },
  footerText: {
    fontSize: 12,
  },
};
