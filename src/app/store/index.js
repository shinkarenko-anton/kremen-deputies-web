
// Redux
import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
// State
import reducers from './reducers';

// Configs

const config = {
  key: 'kremen',
  storage,
};

// Redux store
/* eslint-disable no-underscore-dangle */
export const store = createStore(
  persistCombineReducers(config, reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle */
export const persistor = persistStore(store);

export { default as actions } from './actions';
export { default as selectors } from './selectors';
export default store;
