// React
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Router
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Firebase
import { database } from './shared/Firebase/Firebase';
// Styles
import './app.scss';
import '../../node_modules/font-awesome/css/font-awesome.css';
// State
import reducers from './shared/Redux/Reducers';
import actions from './shared/Redux/Actions';
// Theme
import AppTheme from './shared/Theme/Theme';
// Configs
import ConfigStorage from './shared/Services/ConfigStorage';
// Pages
import ConstituenciesPage from './components/ConstituenciesPage/ConstituenciesPage';
import RightsPage from './components/RightsPage/RightsPage';
// Log
import Log from './shared/Services/Log';
const log = Log.withModule('app');


// Init Log
const logEnabled = ConfigStorage.get('log') || ((typeof ENV !== 'undefined') && (ENV === 'dev'));
if (logEnabled) {
  log.enabled(true);
} else {
  log.enabled(false);
}


// Init State
const savedState = ConfigStorage.get('state');
const store = savedState ? createStore(reducers, savedState) : createStore(reducers);


// Subscribing for updates
store.subscribe(() => {
    // Cache state
  ConfigStorage.set('state', store.getState());
});

// Getting list of deputies
const deputiesRef = database.ref('/deputies');
deputiesRef.once('value').then((snap) => {
  const deputies = snap.val();
  store.dispatch(actions.deputies.set(deputies));
});

// Getting list of constituencies
const constituenciesRef = database.ref('/constituencies');
constituenciesRef.once('value').then((snap) => {
  const constituencies = snap.val();
  store.dispatch(actions.constituencies.set(constituencies));
});

// AppContainer
function AppContainer() {
  const constituenciesPageRender = () => (
    <ConstituenciesPage
      style={{ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0 }}
    />
  );

  return (
    <Provider store={store}>
      <AppTheme>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={constituenciesPageRender}
            />
            <Route
              path="/rights"
              component={RightsPage}
            />
          </Switch>
        </Router>
      </AppTheme>
    </Provider>
  );
}

// Render

injectTapEventPlugin();

ReactDOM.render((<AppContainer />), document.getElementById('app-wrap'));
