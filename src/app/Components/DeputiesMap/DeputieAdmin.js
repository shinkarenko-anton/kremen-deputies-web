// React
import React from "react";
// Redux
import {connect} from 'react-redux';
import actions from '../../Shared/Redux/Actions';
// UI
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
// Firebase
import {auth} from '../../Shared/Firebase/Firebase';
// Log
import Log from '../../Shared/Services/Log';
const log = Log.withModule('DeputieAdmin');
// Configs
import ConfigsKeys from '../../Shared/Configs/ConfigsKeys';

// Redux
const mapStateToProps = (state) => ({
    configs: state.configs
});

const mapDispatchToProps = (dispatch) => ({
    onConfigsChange: (name, val) => dispatch(actions.configs.change(name, val))
});

// DeputieAdmin
class DeputieAdmin extends React.Component{
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
        this.props.onConfigsChange(ConfigsKeys.EDIT_MODE, val);
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

        let isAdmin = this.props.userRole === 'admin';

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
                            toggled={this.props.configs[ConfigsKeys.EDIT_MODE]}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeputieAdmin); 