// React
import React from "react";
// Utils
import _ from 'lodash';
// UI
import Paper from 'material-ui/Paper';


// Style
const containerStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1050,
    outline: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    transition: 'all .3s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0)'
}

const containerHiddenStyle = {
    display: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0)'
}

const containerOpenStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, .5)'
}

const styleTitle = {
    padding: '0 0 20px 0',
    margin: '0 0 0 0',
    fontSize: '20px'
}

const containerWrapStyle = {
    position: 'relative',
    margin: '30px auto',
    maxWidth: '600px',
    transition: 'all .3s ease-in-out'
}

const contentStyle = {
    padding: '24px'
}

const actionsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    justifyContent: 'flex-end'
}

const actionsStyle = {
    paddingLeft: '10px',
    paddingRight: '10px'
}

// Dialog
export default class Dialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Events

    onContainerClick(e){
        e.stopPropagation();
        if(this.props.onRequestClose){
            this.props.onRequestClose(e);
        }
    }

    // Render
    render(){

        const calcContainerStyel = _.assign({}, 
            containerStyle,
            this.props.open ? containerOpenStyle : containerHiddenStyle
        );

        const calcContainerWrapStyel = _.assign({}, 
            containerWrapStyle,
            this.props.open ? {} : {}
        );

        return (
            <div style={calcContainerStyel} onClick={(e) => this.onContainerClick(e)}>
                <div style={calcContainerWrapStyel}>
                    <Paper style={contentStyle}>
                        {this.props.title ? (
                        <h2 style={styleTitle}>
                            {this.props.title}
                        </h2>
                        ) : null}
                        {this.props.children}
                        {this.props.actions ? (
                        <div style={actionsContainerStyle}>
                        {_.map(this.props.actions, (action, key) => (
                            <div key={key} style={actionsStyle}>
                                {action}
                            </div>
                        ))}
                        </div>
                        ) : null}
                    </Paper>
                </div>
            </div>
        );
    }
}
