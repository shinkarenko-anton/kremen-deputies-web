// Utils
import _ from 'lodash';
import utils from 'utils';
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Drawer from 'material-ui/Drawer';
import Map from './Map';
import Sidebar from './Sidebar';
import ConstituencyDialog from 'views/ConstituencyDialog';
import BrandsPanel from 'components/Brands';
import SearchBar from './SearchBar';
// Styles
import Radium from 'radium';
import { mixings } from 'styles';
// Firebase
import { auth, database } from 'services/firebase';
// Configs
import { CONFIG_KEYS } from 'services/configStorage';
// Log
import Log from 'utils/log';
const log = Log.withModule('ConstituenciesPage');

// Prop types

const propTypes = {
  constituencies: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,

  onConstituencyChange: PropTypes.func.isRequired,
  onConfigsChange: PropTypes.func.isRequired,
};

const defaultProps = {

};

// ConstituenciesPage

class ConstituenciesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userRole: null,
      selected: null,
      constituencyDialog: { open: false, item: null },
      drawerOpen: false,
    };
  }

  // Lifecycle hooks

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      log('user state changed');
      log(user);
      this.setState({ user, userRole: null });
      if (user) {
        log(`getting user role: ${user.uid}`);
        database.ref(`/roles/${user.uid}`).once('value').then((snap) => {
          const userRole = snap.val();
          log(`getting user role done: ${JSON.stringify(userRole)}`);
          this.setState({ userRole });
        });
      }
    });
  }

  // Events

  onMapClick = (e) => {
    log(`map click: ${JSON.stringify(e.latLng)}`);
    this.setState({ selected: null });
  }

  onMapCenterChanged = () => {
    // log('on center changed');
    if(!this.map) return;
    const map = this.map.state.map;
    if (map) {
      const center = map.getCenter();
      const centerData = { lat: center.lat(), lng: center.lng() };
      this.props.onConfigsChange(CONFIG_KEYS.MAP_CENTER, centerData);
    }
  }

  onMapZoomChanged = () => {
    if(!this.map) return;
    const map = this.map.state.map;
    if (map) {
      const zoom = map.getZoom();
      this.props.onConfigsChange(CONFIG_KEYS.MAP_ZOOM, zoom);
    }
  }

  onConstituencyClick = (e, constituency) => {
    log(`constituency click: ${constituency.id} at location ${JSON.stringify(e.latLng)}`);
    if (this.isEditMode) return;
    this.setState({
      constituencyDialog: {
        open: true,
        item: constituency,
        key: utils.id.genId(),
      },
    });
  }

  onConstituencyDblClick = (e, constituency) => {
    log(`constituency double click: ${constituency.id} at location ${JSON.stringify(e.latLng)}`);
    this.setState({ selected: constituency });
  }

  onConstituencyChange = (e, constituency) => {
    log(`constituency change: ${constituency.id}`);
    this.props.onConstituencyChange(constituency);
    // Updating firebase
    const id = constituency.id;
    const data = _.cloneDeep(constituency);
    if (data.id) delete data.id;
    database.ref(`/constituencies/${id}`).set(data);
  }

  onConstituencyDialogClose = () =>  {
    log('dialog close');
    this.setState(prev => ({
      constituencyDialog: {
        open: false,
        item: prev.constituencyDialog.item,
      },
    }));
  }

  onOpenMenuClick = () => {
    this.setState({ drawerOpen: true });
  }

  onDrawerRequestChange = () => {
    this.setState({ drawerOpen: false });
  }

  // Properties

  get isEditMode() {
    return this.state.user &&
           this.state.userRole === 'admin' &&
           this.props.configs &&
           this.props.configs[CONFIG_KEYS.EDIT_MODE] === true;
  }

  // Render
  render() {
    // Props
    const {
      style,
      constituencies,
    } = this.props;
    // State
    const {
      selected,
      constituencyDialog,
      drawerOpen,
      user,
      userRole,
    } = this.state;
    // Data
    const editable = this.isEditMode;
    const constArr = _.map(constituencies, (item, id) => ({ id, ...item }));
    // Render
    return (
      <div style={[styles.container, style]}>
        <SearchBar 
          style={styles.searchBar}
          onMenuClick={this.onOpenMenuClick}
        />
        <Map
          ref={(el) => { this.map = el; }}
          containerElement={(<div style={mixings.fullScreen} />)}
          mapElement={(<div style={mixings.fullScreen} />)}

          defaultCenter={this.props.configs[CONFIG_KEYS.MAP_CENTER]}
          defaultZoom={this.props.configs[CONFIG_KEYS.MAP_ZOOM]}

          editable={editable}
          selected={selected}
          items={constArr}

          onMapClick={this.onMapClick}
          onMapCenterChanged={this.onMapCenterChanged}
          onMapZoomChanged={this.onMapZoomChanged}

          onConstituencyClick={this.onConstituencyClick}
          onConstituencyDblClick={this.onConstituencyDblClick}
          onConstituencyChange={this.onConstituencyChange}
        />
        {constituencyDialog.item ? (
          <ConstituencyDialog
            open={constituencyDialog.open}
            item={constituencyDialog.item}
            onClose={this.onConstituencyDialogClose}
          />
        ) : null}
        <Drawer
          docked={false}
          width={360}
          open={drawerOpen}
          onRequestChange={this.onDrawerRequestChange}
        >
        <Sidebar
          style={styles.sidebarWrap}
          user={user}
          userRole={userRole}
        />
        </Drawer>
        <BrandsPanel 
          style={styles.brands}
        />
      </div>
    );
  }
}

// Styles

const styles = {
  container: {

  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  sidebarWrap: {
    padding: 20,
    height: '100%',
  },
  brands: {
    position: 'absolute',
    width: 140,
    left: 0,
    bottom: 24,
  },
};

// Attach prop types
ConstituenciesPage.propTypes = propTypes;
ConstituenciesPage.defaultProps = defaultProps;

export default Radium(ConstituenciesPage);
