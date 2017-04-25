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
import {withGoogleMap, GoogleMap, Marker, Polygon} from "react-google-maps";
// Elements
import DeputiePoligon from './DeputiePoligon';

// Consts
const CITY_LOC = {lat: 49.0589964, lng: 33.403250199999995};

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
            {_.map(props.deputies, deputie => (
                <DeputiePoligon 
                    key={deputie.id}
                    deputie={deputie}
                    editable={true}
                    onChange={(e, path) => props.onDeputieChange(e, deputie)}
                    onClick={(e, deputie) => props.onDeputieClick(e, deputie)}/>
            ))}
        </GoogleMap>
    );
});

// DeputiesMap
class DeputiesMap extends React.Component{

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
        let location = e.latLng;
        log('deputie click: ' + JSON.stringify(location));
    }

    onDeputieChange(e, deputie){
        log('deputie change: ' + deputie.name);
        this.props.onDeputieChange(deputie);
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeputiesMap); 