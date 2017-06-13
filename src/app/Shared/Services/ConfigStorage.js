// Log
import Log from './Log';
const log = Log.withModule('ConfigStorage');

// Config Storage
const keyPrefix = 'kremen:';

function getFullKey(key) {
  return keyPrefix + key;
}

function getConfig(key) {
  const fullKey = getFullKey(key);
  const valStr = localStorage.getItem(fullKey);
  if (valStr === undefined) return null;
  let val = null;
  try {
    val = JSON.parse(valStr);
  } catch (e) {
    log.err(e);
    return null;
  }
  return val;
}

function setConfig(key, val) {
  const fullKey = getFullKey(key);
  const valStr = JSON.stringify(val);
  localStorage.setItem(fullKey, valStr);
}

export default {
  get: getConfig,
  set: setConfig,
};
