// Utils
import _ from 'lodash';

// Init
const initial = {};

// Types
import types from './types';
export {default as types} from './types';

// Actions
export const actions = {
  set: constituencies => ({ type: types.CONSTITUENCIES_SET, constituencies }),
  change: item => ({ type: types.CONSTITUENCIES_CHANGE, item }),
}

// Selectros
export const selectors = {
  data: state => _.get(state, ['constituencies'], {}),
}

// Reducer
export const reducer = (state = initial, action) => {
  switch (action.type){
    case types.CONSTITUENCIES_SET:
      return action.constituencies;
    case types.CONSTITUENCIES_CHANGE: {
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
    default:
      return state;
  }
}

