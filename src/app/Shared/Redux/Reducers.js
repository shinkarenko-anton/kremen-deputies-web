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
        case actionTypes.DEPUTIES_CHANGE:
            let item = action.item;
            if(!item) return state;
            // Clonging just in case
            item = _.clone(item);
            // Getting id from object and remove this id from object
            var id = item.id;
            delete item.id;
            // update state
            state[id] = item;
            return state;
        case actionTypes.DEPUTIES_SET:
            return action.deputies;  
        default:
            return state;
    }
}

function configs(state = {}, action){
    switch (action.type){
        case actionTypes.CONFIGS_CHANGE:
            state = _.clone(state);
            state[action.name] = action.val;
            return state;
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
        deputies: deputies(state.deputies, action),
        configs: configs(state.configs, action)
    }
    
    return state;
}

export default mainReducer;