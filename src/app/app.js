// Styles
import "./app.scss";
import '../../node_modules/font-awesome/css/font-awesome.css';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Log
import Log from './Shared/Services/Log';
const log = Log.withModule('app');
// Theme
import AppTheme from './Components/DeputiesApp/DeputiesAppTheme';
// Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './Shared/Redux/Reducers';
import actions from './Shared/Redux/Actions';
// Router
import {Router, Route, Redirect, hashHistory} from 'react-router';
// Configs
import ConfigStorage from './Shared/Services/ConfigStorage';
// Pages
import DeputiesMap from './Components/DeputiesMap/DeputiesMap';

// Init Log
let logEnabled = ConfigStorage.get('log') || ((typeof ENV !== 'undefined') && (ENV === 'dev'));
if(logEnabled){
    log.enabled(true);
}else{
    log.enabled(false);
}

// Init State
let savedState = ConfigStorage.get('state');
let store = savedState ? createStore(reducers, savedState) : createStore(reducers);

// Subscribing for updates
store.subscribe(() => { 
    // Saving state
    ConfigStorage.set('state', store.getState());
});

// Firebase
import {database, auth} from './Shared/Firebase/Firebase';
// Getting list of deputies
let deputiesRef = database.ref('/deputies');
deputiesRef.once('value').then(snap => {
    const deputies = snap.val();
    store.dispatch(actions.deputies.set(deputies));
});

class AppContainer extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <AppTheme>
                    <DeputiesMap style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
                </AppTheme>
            </Provider>
        );
    }
}

// Render

injectTapEventPlugin();

ReactDOM.render(
    <AppContainer />,
    document.getElementById('app-wrap')
);