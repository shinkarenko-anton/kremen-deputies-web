// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import actions from '../../shared/Redux/Actions';
// UI
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// Utils
import _ from 'lodash';
import utils from '../../shared/Services/Utils';
// Theme
import * as mixings from '../../shared/Style/mixings';
// Elements
import ConstituenciesMap from './Map/ConstituenciesMap';
import ConstituenciesSidebar from './Sidebar/ConstituenciesSidebar';
import ConstituencyDialog from '../ConstituencyDialog/ConstituencyDialog';
import BrandsPanel from '../Brands/BrandsPanel';
// Firebase
import { auth, database } from '../../shared/Firebase/Firebase';
// Configs
import ConfigsKeys from '../../shared/Configs/ConfigsKeys';
// Log
import Log from '../../shared/Services/Log';
const log = Log.withModule('ConstituenciesPage');

// Consts
const CITY_LOC = { lat: 49.0589964, lng: 33.403250199999995 };

// Redux
const mapStateToProps = state => ({
  constituencies: state.constituencies,
  configs: state.configs,
});

const mapDispatchToProps = dispatch => ({
  onConstituencyChange: item => dispatch(actions.constituencies.change(item)),
  onConfigsChange: (name, val) => dispatch(actions.configs.change(name, val)),
});

// ConstituenciesPage
class ConstituenciesPage extends React.Component {
    // Constructor
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

    // Properties

  get isEditMode() {
    return this.state.user &&
               this.state.userRole === 'admin' &&
               this.props.configs &&
               this.props.configs[ConfigsKeys.EDIT_MODE] === true;
  }

    // Events

  onMapLoad(map) {
    if (!map || this._mapComponent) return;
    log('map loaded');
    this._mapComponent = map;
  }

  onMapClick(e) {
    log(`map click: ${JSON.stringify(e.latLng)}`);
    this.setState({ selected: null });
  }

  onMapResize(e) {
        // log('on map resize');
  }

  onMapCenterChanged(e) {
        // log('on center changed');
    if (this._map) {
      const map = this._map.state.map;
      if (map) {
        const center = map.getCenter();
        const centerData = { lat: center.lat(), lng: center.lng() };
        this.props.onConfigsChange(ConfigsKeys.MAP_CENTER, centerData);
      }
    }
  }

  onMapZoomChanged(e) {
    if (this._map) {
      const map = this._map.state.map;
      if (map) {
        const zoom = map.getZoom();
        this.props.onConfigsChange(ConfigsKeys.MAP_ZOOM, zoom);
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
    if (constituency.id) delete constituency.id;
    database.ref(`/constituencies/${id}`).set(data);
  }

  onConstituencyDialogClose(e) {
    log('dialog close');
    this.setState(prev => ({
      constituencyDialog: {
        open: false,
        item: prev.constituencyDialog.item,
      },
    }));
  }

  onOpenMenuClick(e) {
    this.setState({ drawer: { open: true } });
  }

    // Render
  render() {
        // Props

    const newProps = _.clone(this.props);
    if (newProps.constituencies) delete newProps.constituencies;
    if (newProps.configs) delete newProps.configs;
    if (newProps.onConstituencyChange) delete newProps.onConstituencyChange;
    if (newProps.onConstituencyChange) delete newProps.onConstituencyChange;
    if (newProps.onConfigsChange) delete newProps.onConfigsChange;

        // Edit mode
    const editable = this.isEditMode;

        // Mod  data
    const constituencies = _.map(this.props.constituencies, (item, id) => {
      item = _.clone(item);
      item.id = id;
      return item;
    });

    return (
      <div {...newProps}>
        <ConstituenciesMap
          ref={(el) => { this._map = el; }}
          containerElement={(<div style={mixings.fullScreen} />)}
          mapElement={(<div style={mixings.fullScreen} />)}

          defaultCenter={this.props.configs[ConfigsKeys.MAP_CENTER]}
          defaultZoom={this.props.configs[ConfigsKeys.MAP_ZOOM]}

          editable={editable}
          selected={this.state.selected}
          constituencies={constituencies}

          onMapLoad={map => this.onMapLoad(map)}
          onMapClick={e => this.onMapClick(e)}
          onMapResize={e => this.onMapResize(e)}
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
          onRequestChange={open => this.setState({ drawer: { open: false } })}
        >
          <div style={{ padding: 20, height: '100%' }}>
            <ConstituenciesSidebar
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstituenciesPage);
