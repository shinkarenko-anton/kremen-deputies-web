
// Redux
import { createStore } from 'redux';
// State
import reducers from './reducers';

// Redux store
export const store = createStore(reducers);

export { default as actions } from './actions';
export { default as selectors } from './selectors';
export default store;
