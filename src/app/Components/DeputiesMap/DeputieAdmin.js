// React
import React from "react";
// UI
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
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

    onEditModeToggle(e, val){
        e.stopPropagation();
    }

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
        let userData = this.props.userData;

        let isAdmin = userData && (userData.role === 'admin');

        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        const style = {
            row: {
                marginTop: 10
            }
        }

        return (
            <div>
                <div>
                    <h3>{user.displayName}</h3>
                </div>
                {isAdmin ? (
                <div>
                    <div style={style.row}>
                        <Toggle
                            label="Режим редагування"
                            onToggle={(e, val) => this.onEditModeToggle(e, val)}/>
                    </div>
                </div>
                ) : null}
                <div style={style.row}>
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