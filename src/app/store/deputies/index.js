// Utils
import _ from 'lodash';

// Init
const initial = {};

// Types
import types from './types';
export {default as types} from './types';

// Actions
export const actions = {
  set: (deputies) => ({ type: types.DEPUTIES_SET, deputies }),
  change: item => ({ type: types.DEPUTIES_CHANGE, item }),
}

// Selectros
export const selectors = {
  data: state => _.get(state, ['deputies'], {}),
}

// Reducer
export const reducer = (state = initial, action) => {
  switch (action.type){
    case types.DEPUTIES_CHANGE: {
      let item = action.item;
      if (!item) return newState;
      // Clonging just in case
      item = _.clone(item);
      // Getting id from object and remove this id from object
      const id = item.id;
      delete item.id;
      // update state
      newState[id] = item;
      return newState;
    }
    case types.DEPUTIES_SET:
      return action.deputies;
    default:
      return state;
  }
}
