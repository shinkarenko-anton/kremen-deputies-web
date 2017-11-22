// Utils
import _ from 'lodash';
import utils from 'utils';
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import Map from './Map';
import Sidebar from './Sidebar';
import ConstituencyDialog from 'components/ConstituencyDialog';
import BrandsPanel from 'components/Brands';
// Styles
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
      drawer: { open: false },
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

  onMapClick(e) {
    log(`map click: ${JSON.stringify(e.latLng)}`);
    this.setState({ selected: null });
  }

  onMapCenterChanged() {
    // log('on center changed');
    if (this.map) {
      const map = this.map.state.map;
      if (map) {
        const center = map.getCenter();
        const centerData = { lat: center.lat(), lng: center.lng() };
        this.props.onConfigsChange(CONFIG_KEYS.MAP_CENTER, centerData);
      }
    }
  }

  onMapZoomChanged() {
    if (this.map) {
      const map = this.map.state.map;
      if (map) {
        const zoom = map.getZoom();
        this.props.onConfigsChange(CONFIG_KEYS.MAP_ZOOM, zoom);
      }
    }
  }

  onConstituencyClick(e, constituency) {
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

  onConstituencyDblClick(e, constituency) {
    log(`constituency double click: ${constituency.id} at location ${JSON.stringify(e.latLng)}`);
    this.setState({ selected: constituency });
  }

  onConstituencyChange(e, constituency) {
    log(`constituency change: ${constituency.id}`);
    this.props.onConstituencyChange(constituency);
    // Updating firebase
    const id = constituency.id;
    const data = _.cloneDeep(constituency);
    if (data.id) delete data.id;
    database.ref(`/constituencies/${id}`).set(data);
  }

  onConstituencyDialogClose() {
    log('dialog close');
    this.setState(prev => ({
      constituencyDialog: {
        open: false,
        item: prev.constituencyDialog.item,
      },
    }));
  }

  onOpenMenuClick() {
    this.setState({ drawer: { open: true } });
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

    const newProps = _.clone(this.props);
    if (newProps.constituencies) delete newProps.constituencies;
    if (newProps.configs) delete newProps.configs;
    if (newProps.onConstituencyChange) delete newProps.onConstituencyChange;
    if (newProps.onConfigsChange) delete newProps.onConfigsChange;

    // Edit mode
    const editable = this.isEditMode;

    // Mod  data
    const constituencies = _.map(this.props.constituencies, (item, id) => {
      const newItem = _.clone(item);
      newItem.id = id;
      return newItem;
    });

    const onMapLoad = () => {
      log('map loaded');
    };

    const onMapResize = () => {
      // log('on map resize');
    };

    return (
      <div {...newProps}>
        <Map
          ref={(el) => { this.map = el; }}
          containerElement={(<div style={mixings.fullScreen} />)}
          mapElement={(<div style={mixings.fullScreen} />)}

          defaultCenter={this.props.configs[CONFIG_KEYS.MAP_CENTER]}
          defaultZoom={this.props.configs[CONFIG_KEYS.MAP_ZOOM]}

          editable={editable}
          selected={this.state.selected}
          constituencies={constituencies}

          onMapLoad={map => onMapLoad(map)}
          onMapClick={e => this.onMapClick(e)}
          onMapResize={e => onMapResize(e)}
          onMapCenterChanged={e => this.onMapCenterChanged(e)}
          onMapZoomChanged={e => this.onMapZoomChanged(e)}

          onConstituencyClick={(e, constituency) => this.onConstituencyClick(e, constituency)}
          onConstituencyDblClick={(e, constituency) => this.onConstituencyDblClick(e, constituency)}
          onConstituencyChange={(e, constituency) => this.onConstituencyChange(e, constituency)}
        />
        {this.state.constituencyDialog.item ? (
          <ConstituencyDialog
            open={this.state.constituencyDialog.open}
            item={this.state.constituencyDialog.item}
            onClose={e => this.onConstituencyDialogClose(e)}
          />
                ) : null}
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
          <FloatingActionButton
            iconStyle={{ color: '#FFFFFF' }}
            mini
            iconClassName="fa fa-question"
            onClick={e => this.onOpenMenuClick(e)}
          />
        </div>
        <Drawer
          docked={false}
          openSecondary
          width={360}
          open={this.state.drawer.open}
          onRequestChange={() => this.setState({ drawer: { open: false } })}
        >
          <div style={{ padding: 20, height: '100%' }}>
            <Sidebar
              userRole={this.state.userRole}
              user={this.state.user}
            />
          </div>
        </Drawer>
        <BrandsPanel style={{ position: 'absolute', width: 140, left: 0, bottom: 24 }} />
      </div>
    );
  }
}

// Attach prop types
ConstituenciesPage.propTypes = propTypes;
ConstituenciesPage.defaultProps = defaultProps;

export default ConstituenciesPage;
