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
// Theme
import * as mixings from '../../Shared/Style/mixings';
import colors from '../DeputiesApp/DeputiesAppColors';
// Google Map
import {withGoogleMap, GoogleMap, Marker, Polygon, MarkerLabel} from "react-google-maps";
// import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
// Elements
import DeputiePoligon from './DeputiePoligon';
import DeputieDialog from '../DeputieDialog/DeputieDialog';
import DeputieSidebar from './DeputieSidebar';
import BrandsPanel from './BrandsPanel';
// Firebase
import {auth, database} from '../../Shared/Firebase/Firebase';
// Configs
import ConfigsKeys from '../../Shared/Configs/ConfigsKeys';

// Consts
const CITY_LOC = {lat: 49.0589964, lng: 33.403250199999995};

// Redux
const mapStateToProps = (state) => ({
    deputies: state.deputies,
    configs: state.configs
});

const mapDispatchToProps = (dispatch) => ({
    onDeputieChange: (item) => dispatch(actions.deputies.change(item)),
    onConfigsChange: (name, val) => dispatch(actions.configs.change(name, val))
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
                    editable={props.editable}
                    onChange={(e, path) => props.onDeputieChange(e, deputie)}
                    onClick={(e, deputie) => props.onDeputieClick(e, deputie)}
                    onDblClick={(e, deputie) => props.onDeputieDblClick(e, deputie)}/>) : null,
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
            userRole: null,
            selected: null,
            deputieDialog: {open: false, item: null, key: utils.id.genId()},
            drawer: {open: false}
        }
    }

    // Lifecycle hooks

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            log('user state changed');
            log(user);
            this.setState({user, userRole: null});
            if(user){
                log('getting user role: ' + user.uid);
                database.ref('/roles/' + user.uid).once('value').then(snap => {
                    const userRole = snap.val();
                    log('getting user role done: ' + JSON.stringify(userRole));
                    this.setState({userRole});
                });
            }
        });
    }

    // Properties

    get isEditMode(){
        return this.state.user && 
               this.state.userRole === 'admin' &&
               this.props.configs && 
               this.props.configs[ConfigsKeys.EDIT_MODE] === true;
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
        this.setState({selected: null});
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
                this.props.onConfigsChange(ConfigsKeys.MAP_CENTER, centerData);
            }
        }
    }

    onMapZoomChanged(e){
        // log('on zoom changed');
        if(this._map){
            let map = this._map.state.map;
            if(map){
                let zoom = map.getZoom();
                this.props.onConfigsChange(ConfigsKeys.MAP_ZOOM, zoom);
            }
        }
    }

    onDeputieClick(e, deputie){
        log('deputie click: ' + deputie.name);
        if(this.isEditMode) return;
        this.setState({deputieDialog: {open: true, item: deputie, key: null}});
    }

    onDeputieDblClick(e, deputie){
        log('deputie double click: ' + deputie.name);
        this.setState({selected: deputie});
    }

    onDeputieChange(e, deputie){
        log('deputie change: ' + deputie.name);
        this.props.onDeputieChange(deputie);
        // Updating firebase
        let id = deputie.id;
        let data = _.cloneDeep(deputie);
        if(data.id) delete data.id;
        database.ref('/deputies/' + id).set(data);
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
        if(newProps.configs) delete newProps.configs;
        if(newProps.onDeputieChange) delete newProps.onDeputieChange;
        if(newProps.onConfigsChange) delete newProps.onConfigsChange;

        // Edit mode
        let editable = this.isEditMode;

        // Mod deputies data
        let deputies = _.map(this.props.deputies, (item, id) => {
            item = _.clone(item);
            item.id = id;
            return item;
        });

        if(editable && this.state.selected){
            deputies = _.filter(deputies, item => item.id == this.state.selected.id);
        }

        return (
            <div {...newProps}>
                <KremenGoogleMap
                    ref={(el) => {this._map = el}}
                    containerElement={(<div style={mixings.fullScreen} />)}
                    mapElement={(<div style={mixings.fullScreen} />)}

                    defaultCenter={this.props.configs[ConfigsKeys.MAP_CENTER]}
                    defaultZoom={this.props.configs[ConfigsKeys.MAP_ZOOM]}
                    
                    editable={editable}
                    deputies={deputies}

                    onMapLoad={(map) => this.onMapLoad(map)}
                    onMapClick={(e) => this.onMapClick(e)}
                    onDeputieClick={(e, deputie) => this.onDeputieClick(e, deputie)}
                    onDeputieDblClick={(e, deputie) => this.onDeputieDblClick(e, deputie)}
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
                <div style={{position: 'absolute', right: 20, top: 20}}>
                    <FloatingActionButton
                        iconStyle={{color: '#FFFFFF'}}
                        mini={true} 
                        iconClassName="fa fa-question"
                        onClick={(e) => this.onOpenMenuClick(e)}/>
                </div>
                <Drawer
                    docked={false}
                    openSecondary={true}
                    width={300}
                    open={this.state.drawer.open}
                    onRequestChange={(open) => this.setState({drawer: {open: false}})}>
                    <div style={{padding: 20, height: '100%'}}>
                        <DeputieSidebar 
                            userRole={this.state.userRole}
                            user={this.state.user} />
                    </div>
                </Drawer>
                <BrandsPanel 
                    style={{position: 'absolute', width: 100, left: 0, bottom: 24}}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeputiesMap); 