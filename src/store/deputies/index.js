// Utils
import _ from 'lodash';

// Init
const initial = {};

// Types
import types from './types';
export { default as types } from './types';

// Actions
export const actions = {
  set: deputies => ({ type: types.DEPUTIES_SET, deputies }),
  change: item => ({ type: types.DEPUTIES_CHANGE, item }),
};

// Selectros
export const selectors = {
  get: state => _.get(state, ['deputies'], {}),
};

// Reducer
export const reducer = (state = initial, action) => {
  switch (action.type) {
    case types.DEPUTIES_CHANGE: {
      const { item } = action;
      if (!item) return state;
      // Getting id and data from object
      const { id, ...deputieData } = item;
      // Updating state with new deputie info
      return { ...state, [id]: deputieData };
    }
    case types.DEPUTIES_SET:
      return action.deputies;
    default:
      return state;
  }
};
