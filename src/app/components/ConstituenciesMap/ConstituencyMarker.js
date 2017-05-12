// React
import React from "react";

// ConstituencyMarker
export default class ConstituencyMarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Lifecycle hooks

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    // Render

    render(){
        return (
            <div>{this.props.children}</div>
        );
    }
}