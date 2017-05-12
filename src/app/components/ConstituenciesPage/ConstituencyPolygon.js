// React
import React from "react";
// Log
import Log from '../../shared/Services/Log';
const log = Log.withModule('ConstituencyPoligon');
// Theme
import colors from '../../shared/Theme/Colors';
// Google Maps
import {Polygon, Marker} from "react-google-maps";

// Helpers
const pathToData = (path) => (
    _.map(path.getArray(), (item, index) => ({ lat: item.lat(), lng: item.lng()}))
);

const getPolygonCenter = (path) => {
    var bound = new google.maps.LatLngBounds();
    _.each(path, item => {
        bound.extend( new google.maps.LatLng(item.lat, item.lng));
    });
    let center = bound.getCenter();
    return {lat: center.lat(), lng: center.lng()};
}

// ConstituencyPoligon
export default class ConstituencyPoligon extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Lifecycle hooks

    componentDidMount(){
        
    }

    componentWillUnmount(){
        this._polygon = null;
    }

    // Element

    handlePolygon(polygon){
        if(!polygon) return;
        this._polygon = polygon;
        let path = polygon.getPath();

        const updateConstituencyPath = () => {
            let newPath = pathToData(path);
            this.props.onChange(null, path);
        }

        path.addListener('set_at', () => {
            updateConstituencyPath();
        });

        path.addListener('remove_at', () => {
            updateConstituencyPath();
        });

        path.addListener('insert_at', () => {
            updateConstituencyPath();
        });
    }

    // Render

    render(){
        // Constituency
        let polygon = this.props.polygon;
        if(!polygon) return null;

        let paths = [];
        if(polygon.outer){
            paths.push(polygon.outer);
        }
        if(polygon.inner){
            paths.push(polygon.inner);
        }

        return (
            <Polygon 
                ref={(el) => this.handlePolygon(el)}
                paths={paths}
                editable={this.props.editable}
                draggable={false}
                options={{
                    strokeColor: colors.blue,
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: colors.blue,
                    fillOpacity: 0.1
                }}
                onClick={(e) => this.props.onClick(e)}
                onDblClick={(e) => this.props.onDblClick(e)}
            />
        );
    }
}