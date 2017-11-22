// React
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Navigation
import Navigation from 'navigation';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
// Firebase
import { database } from 'services/firebase';
// Styles
import './app.scss';
import '../../node_modules/font-awesome/css/font-awesome.css';
// State
import { store, actions, persistor } from 'store';
// Styles
import { Theme } from 'styles';
// Configs
import ConfigStorage from 'services/configStorage';
// Log
import Log from 'utils/log';
const log = Log.withModule('app');

// Init Log
const logEnabled = ConfigStorage.get('log') || ((typeof ENV !== 'undefined') && (ENV === 'dev'));
if (logEnabled) {
  log.enabled(true);
} else {
  log.enabled(false);
}

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
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Theme>
          <Navigation />
        </Theme>
      </PersistGate>
    </Provider>
  );
}

// Render

injectTapEventPlugin();

ReactDOM.render((<AppContainer />), document.getElementById('app-wrap'));
