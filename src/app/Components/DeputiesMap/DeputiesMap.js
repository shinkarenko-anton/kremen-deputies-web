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

// Consts
const CITY_LOC = {lat: 49.0589964, lng: 33.403250199999995};

// Map
const KremenGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={(map) => props.onMapLoad(map)}
    defaultZoom={12}
    defaultCenter={CITY_LOC}
    onClick={(e) => props.onMapClick(e)}>
    {_.map(props.polygons, (polygon, index) => (
        <Polygon 
            {...polygon}
            onClick={(e) => props.onPolygonClick(e, polygon)}/>
    ))}
  </GoogleMap>
));

// Redux
const mapStateToProps = (state) => ({
    deputies: state.deputies
});

const mapDispatchToProps = (dispatch) => ({
    
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

    onPolygonClick(e, polygon){
        let location = e.latLng;
        log('polygon click: ' + JSON.stringify(location));
    }

    // Render
    render(){
        // Converting data to polygons
        let polygonStyle = {
            strokeColor: colors.orange,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: colors.orange,
            fillOpacity: 0.35
        }

        let polygons = _.map(this.props.deputies, (item, key) => {
            return _.assign({}, {options: polygonStyle}, {
                key,
                paths: item.path,
                editable: true
            });
        }); 

        // Props
        let newProps = _.clone(this.props);
        if(newProps.deputies) delete newProps.deputies;

        return (
            <div {...newProps}>
                <KremenGoogleMap
                    containerElement={(<div style={mixings.fullScreen} />)}
                    mapElement={(<div style={mixings.fullScreen} />)}

                    polygons={polygons}

                    onMapLoad={(map) => this.onMapLoad(map)}
                    onMapClick={(e) => this.onMapClick(e)}
                    onPolygonClick={(e, polygon) => this.onPolygonClick(e, polygon)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeputiesMap); 