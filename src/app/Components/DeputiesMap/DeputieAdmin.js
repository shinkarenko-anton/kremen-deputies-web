// React
import React from "react";
// UI
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// Firebase
import {auth} from '../../Shared/Firebase/Firebase';
// Log
import Log from '../../Shared/Services/Log';
const log = Log.withModule('DeputieAdmin');

// DeputieAdmin
export default class DeputieAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Lifecycle hooks

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    // Events

    onLogoutClick(e){
        e.stopPropagation();
        log('logout click');
        auth.signOut().then(() => {
            log('user logouted');
        }).catch((err) => {
            log.err(err);
        });
    }

    // Render

    render(){
        let user = this.props.user;
        if(!user) return null;

        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        return (
            <div>
                <div>
                    <h3>{user.displayName}</h3>
                </div>
                <div>
                    <RaisedButton 
                        label="Вийти"
                        primary={true}
                        fullWidth={true}
                        onClick={(e) => this.onLogoutClick(e)}/>
                </div>
            </div>
        );
    }
}