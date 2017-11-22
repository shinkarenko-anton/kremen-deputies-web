// Utils
import _ from 'lodash';

// Init
const initial = {};

// Types
import types from './types';
export {default as types} from './types';

// Actions
export const actions = {
  change: (name, val) => ({ type: types.CONFIGS_CHANGE, name, val }),
}

// Selectros
export const selectors = {
  get: (state) => _.get(state, ['configs'], {}),
}

// Reducer
export const reducer = (state = initial, action) => {
  switch (action.type){
    case types.CONFIGS_CHANGE:
      return {...state, [action.name]: action.val};
    default:
      return state;
  }
}
