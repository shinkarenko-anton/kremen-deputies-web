// React
import React from 'react';
// Utils
import _ from 'lodash';
// Google Map
import {withGoogleMap, GoogleMap} from "react-google-maps";
// Elements
import ConstituencyPolygon from './ConstituencyPolygon';
import ConstituencyMarker from './ConstituencyMarker';
// Log
import Log from '../../shared/Services/Log';
const log = Log.withModule('ConstituenciesMap');

// Consts
const KREMEN_CENTER_LOCATION = {lat: 49.0589964, lng: 33.403250199999995};

// ConstituenciesMap
export default withGoogleMap(props => {

    let constituencies = props.constituencies;

    return (
        <GoogleMap
            ref={(map) => props.onMapLoad(map)}

            defaultZoom={props.defaultZoom || 12}
            defaultCenter={props.defaultCenter || KREMEN_CENTER_LOCATION}

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

            {_.map(constituencies, item => {
                let elements = [];
                _.each(item.polygons, (polygon, index) => {
                    elements.push(
                        <ConstituencyPolygon 
                            key={"polygon-" + item.id + "-" + index}
                            polygon={polygon}
                            editable={props.editable}
                            onChange={(e, path) => {item.polygons[index] = path; props.onConstituencyChange(e, item)}}
                            onClick={(e) => props.onConstituencyClick(e, item)}
                            onDblClick={(e) => props.onConstituencyDblClick(e, item)}
                        />
                    );
                });
                _.each(item.markers, (marker, index) => {
                    elements.push(
                        <ConstituencyMarker
                            key={"marker-" + item.id + "-" + index}
                            position={marker}
                            label={item.number.toString()}
                        />
                    );
                });
                return elements;
            })}
        </GoogleMap>
    );
});