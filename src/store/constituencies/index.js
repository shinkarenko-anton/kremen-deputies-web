// Utils
import _ from 'lodash';

// Init
const initial = {};

// Types
import types from './types';
export { default as types } from './types';

// Actions
export const actions = {
  set: constituencies => ({ type: types.CONSTITUENCIES_SET, constituencies }),
  change: item => ({ type: types.CONSTITUENCIES_CHANGE, item }),
};

// Selectros
export const selectors = {
  get: state => _.get(state, ['constituencies'], {}),
};

// Reducer
export const reducer = (state = initial, action) => {
  switch (action.type) {
    case types.CONSTITUENCIES_SET:
      return action.constituencies;
    case types.CONSTITUENCIES_CHANGE: {
      const { item } = action;
      if (!item) return state;
      const { id, ...constData } = item;
      return { ...state, [id]: constData };
    }
    default:
      return state;
  }
};

