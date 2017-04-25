// Log
import Log from './Log';
const log = Log.withModule('ConfigStorage');

// Config Storage
const keyPrefix = 'kremen:';

function getConfig(key){
    let fullKey = getFullKey(key);
    let valStr = localStorage.getItem(fullKey);
    if(valStr === undefined) return null;
    let val = null;
    try{
        val = JSON.parse(valStr);
    }catch(e){
        log.err(e);
        return null;
    }
    return val;
}

function setConfig(key, val){
    let fullKey = getFullKey(key);
    let valStr = JSON.stringify(val);
    localStorage.setItem(fullKey, valStr);
}

function getFullKey(key){
    return keyPrefix + key;
}

export default {
    get: getConfig,
    set: setConfig
}