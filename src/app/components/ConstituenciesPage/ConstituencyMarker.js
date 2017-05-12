// React
import React from "react";
// UI
import {Marker} from "react-google-maps";

// ConstituencyMarker
export default class ConstituencyMarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Render

    render(){
        return (
            <Marker
                position={this.props.position}
                label={this.props.label}
            />
        );
    }
}