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
const KREMEN_CENTER_LOCATION = {lat: 49.07041247214882, lng: 33.42281959697266};

// ConstituenciesMap
export default withGoogleMap(props => {

    let constituencies = props.constituencies;
    let selected = props.selected;

    return (
        <GoogleMap
            ref={(map) => props.onMapLoad(map)}

            defaultZoom={props.defaultZoom || 13}
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
                            editable={props.editable && selected && (selected.id == item.id)}
                            onChange={(e, path) => {let newItem = _.clone(item); newItem.polygons[index] = path; props.onConstituencyChange(e, newItem)}}
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