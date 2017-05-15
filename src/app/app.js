// Styles
import "./app.scss";
import '../../node_modules/font-awesome/css/font-awesome.css';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './shared/Redux/Reducers';
import actions from './shared/Redux/Actions';
// Router
import {
    BrowserRouter as Router, 
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
// Log
import Log from './shared/Services/Log';
const log = Log.withModule('app');
// Theme
import AppTheme from './shared/Theme/Theme';
// Configs
import ConfigStorage from './shared/Services/ConfigStorage';
// Pages
import ConstituenciesPage from './components/ConstituenciesPage/ConstituenciesPage';
import RightsPage from './components/RightsPage/RightsPage';


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
    // Cache state
    ConfigStorage.set('state', store.getState());
});


// Firebase
import {database, auth} from './shared/Firebase/Firebase';

// Getting list of deputies
let deputiesRef = database.ref('/deputies');
deputiesRef.once('value').then(snap => {
    let deputies = snap.val();
    store.dispatch(actions.deputies.set(deputies));
});

// Getting list of constituencies
let constituenciesRef = database.ref('/constituencies');
constituenciesRef.once('value').then(snap => {
    let constituencies = snap.val();
    store.dispatch(actions.constituencies.set(constituencies));
});

class AppContainer extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <AppTheme>
                    <Router>
                        <Switch>
                            <Route exact path="/" render={props => (
                                <ConstituenciesPage style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0}}/>
                            )}/>
                            <Route path="/rights" component={RightsPage} />
                        </Switch>
                    </Router>
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