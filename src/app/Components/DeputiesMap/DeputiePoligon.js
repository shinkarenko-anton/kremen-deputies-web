// React
import React from "react";
// Log
import Log from '../../Shared/Services/Log';
const log = Log.withModule('DeputiePoligon');
// Theme
import colors from '../DeputiesApp/DeputiesAppColors';
// Google Maps
import {Polygon, constants} from "react-google-maps";

// Helpers
const pathToData = (path) => (
    _.map(path.getArray(), (item, index) => ({ lat: item.lat(), lng: item.lng()}))
);

// DeputiePoligon
export default class DeputiePoligon extends React.Component{
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

        const updateDeputiePath = () => {
            let newPath = pathToData(path);
            let deputie = this.props.deputie;
            deputie.path = newPath;
            this.props.onChange(null, deputie);
        }

        path.addListener('set_at', () => {
            updateDeputiePath();
        });

        path.addListener('remove_at', () => {
            updateDeputiePath();
        });

        path.addListener('insert_at', () => {
            updateDeputiePath();
        });
    }

    // Render

    render(){
        // Deputie
        let deputie = this.props.deputie;
        if(!deputie) return null;

        return (
            <Polygon 
                ref={(polygon) => this.handlePolygon(polygon)}
                paths={deputie.path}
                editable={this.props.editable}
                options={{
                    strokeColor: colors.orange,
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: colors.orange,
                    fillOpacity: 0.35
                }}
                onClick={(e) => this.props.onClick(e, deputie)}
            />
        );
    }
}