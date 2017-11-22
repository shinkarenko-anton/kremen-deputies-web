// Redux
import { combineReducers } from 'redux';
// Reducers
import { reducer as configs } from './configs';
import { reducer as constituencies } from './constituencies';
import { reducer as deputies } from './deputies';

export default {
  configs,
  constituencies,
  deputies,
};
