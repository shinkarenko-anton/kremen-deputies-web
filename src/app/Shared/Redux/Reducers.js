// Utils
import _ from 'lodash';
// Redux
import { actionTypes } from './Actions';
// Log
import Log from '../Services/Log';
const log = Log.withModule('Reducers');

// Deputies

function deputies(state = {}, action) {
  const newState = state;
  switch (action.type) {
    case actionTypes.DEPUTIES_CHANGE: {
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
    case actionTypes.DEPUTIES_SET:
      return action.deputies;
    default:
      return newState;
  }
}

// Constituencies

function constituencies(state = {}, action) {
  const newState = state;
  switch (action.type) {
    case actionTypes.CONSTITUENCIES_SET:
      return action.constituencies;
    case actionTypes.CONSTITUENCIES_CHANGE: {
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
      return newState;
  }
}

// Consfigs

function configs(state = {}, action) {
  let newState = state;
  switch (action.type) {
    case actionTypes.CONFIGS_CHANGE:
      newState = _.clone(newState);
      newState[action.name] = action.val;
      return newState;
    default:
      return newState;
  }
}

// Main reducer

function mainReducer(state = {}, action) {
  let newState = state;
  log(action);
  // Setting store data action
  if (action.type === actionTypes.STORE_SET_STATE) {
    log('setting new state');
    newState = { ...newState, ...action.state };
  }

  // New state
  newState = {
    deputies: deputies(newState.deputies, action),
    configs: configs(newState.configs, action),
    constituencies: constituencies(newState.constituencies, action),
  };

  return newState;
}

export default mainReducer;
