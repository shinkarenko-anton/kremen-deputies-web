// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
import actions from '../../Shared/Redux/Actions';
// UI
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// Log
import Log from '../../Shared/Services/Log';
const log = Log.withModule('DeputiesMap');
// Utils
import _ from 'lodash';
import utils from '../../Shared/Services/Utils';
// Config
import ConfigStorage from '../../Shared/Services/ConfigStorage';
// Theme
import * as mixings from '../../Shared/Style/mixings';
import colors from '../DeputiesApp/DeputiesAppColors';
// Google Map
import {withGoogleMap, GoogleMap, Marker, Polygon, MarkerLabel} from "react-google-maps";
// Elements
import DeputiePoligon from './DeputiePoligon';
import DeputieDialog from '../DeputieDialog/DeputieDialog';
import DeputieSidebar from './DeputieSidebar';
// Firebase
import {auth, database} from '../../Shared/Firebase/Firebase';

// Consts
const CITY_LOC = {lat: 49.0589964, lng: 33.403250199999995};
const configKeys = {
    MAP_CENTER: 'map-center',
    MAP_ZOOM: 'map-zoom'
}

// Redux
const mapStateToProps = (state) => ({
    deputies: state.deputies
});

const mapDispatchToProps = (dispatch) => ({
    onDeputieChange: (item) => dispatch(actions.deputies.change(item))
});

// Map
const KremenGoogleMap = withGoogleMap(props => {
    return (
        <GoogleMap
            ref={(map) => props.onMapLoad(map)}

            defaultZoom={props.defaultZoom || 12}
            defaultCenter={props.defaultCenter || CITY_LOC}

            options= {{
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_LEFT
                }
            }}

            onClick={(e) => props.onMapClick(e)}
            onResize={(e) => props.onMapResize(e)}
            onCenterChanged={(e) => props.onMapCenterChanged(e)}
            onZoomChanged={(e) => props.onMapZoomChanged(e)}>
            {_.map(props.deputies, deputie => {
                return [
                deputie.path ? (<DeputiePoligon 
                    key={"polygon-" + deputie.id}
                    deputie={deputie}
                    editable={false}
                    onChange={(e, path) => props.onDeputieChange(e, deputie)}
                    onClick={(e, deputie) => props.onDeputieClick(e, deputie)}/>) : null,
                deputie.center ? (<Marker
                    key={"marker-" + deputie.id}
                    position={deputie.center}
                    label={deputie.locationId.toString()}
                    onClick={_.noop}
                    onRightClick={_.noop}
                    onDragStart={_.noop}/>) : null
                ];
            })}
        </GoogleMap>
    );
});

// DeputiesMap
class DeputiesMap extends React.Component{
    // Constructor
    constructor(props){
        super(props);
        this.state = {
            user: null,
            userData: null,
            deputieDialog: {open: false, item: null, key: utils.id.genId()},
            drawer: {open: false}
        }
        // Loading configs
        this._defaultCenter = ConfigStorage.get(configKeys.MAP_CENTER);
        this._defaultZoom = ConfigStorage.get(configKeys.MAP_ZOOM);
    }

    // Lifecycle hooks

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            log('user state changed');
            log(user);
            this.setState({user, userData: null});
            if(user){
                log('getting user data: ' + user.uid);
                database.ref('/users/' + user.uid).once('value').then(snap => {
                    const userData = snap.val();
                    log('getting user data done: ' + JSON.stringify(userData));
                    this.setState({userData});
                });
            }
        });
    }

    // Events

    onMapLoad(map){
        if(!map || this._mapComponent) return;
        log('map loaded');
        this._mapComponent = map;
    }

    onMapClick(e){
        let location = e.latLng;
        log('map click: ' + JSON.stringify(location));
    }

    onMapResize(e){
        // log('on map resize');
    }

    onMapCenterChanged(e){
        // log('on center changed');
        if(this._map){
            let map = this._map.state.map;
            if(map){
                let center = map.getCenter();
                let centerData = {lat: center.lat(), lng: center.lng()};
                ConfigStorage.set(configKeys.MAP_CENTER, centerData);
            }
        }
    }

    onMapZoomChanged(e){
        // log('on zoom changed');
        if(this._map){
            let map = this._map.state.map;
            if(map){
                let zoom = map.getZoom();
                ConfigStorage.set(configKeys.MAP_ZOOM, zoom);
            }
        }
    }

    onDeputieClick(e, deputie){
        log('deputie click: ' + deputie.name);
        this.setState({deputieDialog: {open: true, item: deputie, key: null}});
    }

    onDeputieChange(e, deputie){
        log('deputie change: ' + deputie.name);
        this.props.onDeputieChange(deputie);
    }

    onDeputieDialogClose(e){
        this.setState(prev => ({deputieDialog: {open: false, item: prev.deputieDialog.item, key: prev.deputieDialog.key}}));
    }

    onOpenMenuClick(e){
        this.setState({drawer: {open: true}});
    }

    // Render
    render(){ 
        // Props
        let newProps = _.clone(this.props);
        if(newProps.deputies) delete newProps.deputies;
        if(newProps.onDeputieChange) delete newProps.onDeputieChange;
        // Mod deputies data
        let deputies = _.map(this.props.deputies, (item, id) => {
            item = _.clone(item);
            item.id = id;
            return item;
        });

        return (
            <div {...newProps}>
                <div style={{position: 'absolute', right: 20, top: 20}}>
                    <FloatingActionButton
                        iconStyle={{color: '#FFFFFF'}}
                        mini={true} 
                        iconClassName="fa fa-question"
                        onClick={(e) => this.onOpenMenuClick(e)}/>
                </div>
                <KremenGoogleMap
                    ref={(el) => {this._map = el}}
                    containerElement={(<div style={mixings.fullScreen} />)}
                    mapElement={(<div style={mixings.fullScreen} />)}

                    defaultCenter={this._defaultCenter}
                    defaultZoom={this._defaultZoom}

                    deputies={deputies}

                    onMapLoad={(map) => this.onMapLoad(map)}
                    onMapClick={(e) => this.onMapClick(e)}
                    onDeputieClick={(e, deputie) => this.onDeputieClick(e, deputie)}
                    onDeputieChange={(e, deputie) => this.onDeputieChange(e, deputie)}
                    onMapResize={(e) => this.onMapResize(e)}
                    onMapCenterChanged={(e) => this.onMapCenterChanged(e)}
                    onMapZoomChanged={(e) => this.onMapZoomChanged(e)}
                />
                {this.state.deputieDialog.item ? (
                <DeputieDialog 
                    key={this.state.deputieDialog.key}
                    open={this.state.deputieDialog.open}
                    item={this.state.deputieDialog.item}
                    onClose={(e) => this.onDeputieDialogClose(e)}
                />
                ) : null}
                <Drawer
                    docked={false}
                    openSecondary={true}
                    width={300}
                    open={this.state.drawer.open}
                    onRequestChange={(open) => this.setState({drawer: {open: false}})}>
                    <div style={{padding: 20, height: '100%'}}>
                        <DeputieSidebar 
                            userData={this.state.userData}
                            user={this.state.user} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeputiesMap); 