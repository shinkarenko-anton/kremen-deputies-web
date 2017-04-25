// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
import actions from '../../Shared/Redux/Actions';
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
// Elements
import DeputiePoligon from './DeputiePoligon';
import DeputieDialog from '../DeputieDialog/DeputieDialog';

// Consts
const CITY_LOC = {lat: 49.0589964, lng: 33.403250199999995};

// Helpers
const getPolygonCenter = (path) => {
    var bound = new google.maps.LatLngBounds();
    _.each(path, item => {
        bound.extend( new google.maps.LatLng(item.lat, item.lng));
    });
    return bound.getCenter();
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
            defaultZoom={12}
            defaultCenter={CITY_LOC}
            onClick={(e) => props.onMapClick(e)}>
            {_.map(props.deputies, deputie => {
                return [
                (<DeputiePoligon 
                    key={"polygon-" + deputie.id}
                    deputie={deputie}
                    editable={false}
                    onChange={(e, path) => props.onDeputieChange(e, deputie)}
                    onClick={(e, deputie) => props.onDeputieClick(e, deputie)}/>),
                (<Marker
                    key={"marker-" + deputie.id}
                    position={getPolygonCenter(deputie.path)}
                    label={deputie.locationId.toString()}
                    onClick={_.noop}
                    onRightClick={_.noop}
                    onDragStart={_.noop}/>)
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
            deputieDialog: {open: false, item: null, key: utils.id.genId()}
        }
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

    // Render
    render(){ 

        // Props
        let newProps = _.clone(this.props);
        if(newProps.deputies) delete newProps.deputies;
        if(newProps.onDeputieChange) delete newProps.onDeputieChange;

        let deputies = _.map(this.props.deputies, (item, id) => {
            item = _.clone(item);
            item.id = id;
            return item;
        });

        return (
            <div {...newProps}>
                <KremenGoogleMap
                    containerElement={(<div style={mixings.fullScreen} />)}
                    mapElement={(<div style={mixings.fullScreen} />)}

                    deputies={deputies}

                    onMapLoad={(map) => this.onMapLoad(map)}
                    onMapClick={(e) => this.onMapClick(e)}
                    onDeputieClick={(e, deputie) => this.onDeputieClick(e, deputie)}
                    onDeputieChange={(e, deputie) => this.onDeputieChange(e, deputie)}
                />
                {this.state.deputieDialog.item ? (
                <DeputieDialog 
                    key={this.state.deputieDialog.key}
                    open={this.state.deputieDialog.open}
                    item={this.state.deputieDialog.item}
                    onClose={(e) => this.onDeputieDialogClose(e)}
                />
                ) : null}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeputiesMap); 