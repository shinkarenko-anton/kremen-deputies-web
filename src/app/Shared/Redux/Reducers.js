// Redux components
import {actionTypes} from './Actions';
// Utils
import _ from 'lodash';
import Log from '../Services/Log';
const log = Log.withModule('Reducers');
// Redux
import { combineReducers } from 'redux';

// Deputies

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

// Constituencies

function constituencies(state = {}, action){
    switch (action.type){
        case actionTypes.CONSTITUENCIES_SET:
            return action.constituencies; 
        case actionTypes.CONSTITUENCIES_CHANGE:
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
        default:
            return state;
    }
}

// Consfigs

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

// Main reducer

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
        configs: configs(state.configs, action),
        constituencies: constituencies(state.constituencies, action)
    }
    
    return state;
}

export default mainReducer;