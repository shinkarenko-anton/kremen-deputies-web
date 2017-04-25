// Redux components
import {actionTypes} from './Actions';
// Utils
import _ from 'lodash';
import Log from '../Services/Log';
const log = Log.withModule('Reducers');
// Redux
import { combineReducers } from 'redux';

// ########################
// Deputies
// ########################

function deputies(state = {}, action){
    switch (action.type){
        // case actionTypes.SOME_ACTION:
        //     return state.concat(items);    
        default:
            return state;
    }
}

function mainReducer(state = {}, action){
    log(action);

    // Setting store data action
    if(action.type == actionTypes.STORE_SET_STATE){
        log('setting new state');
        state = _.assign({}, state, action.state);
    }

    // New state
    state =  {
        deputies: deputies(state.deputies, action)
    }
    
    return state;
}

export default mainReducer;