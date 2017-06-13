export const actionTypes = {
  STORE_SET_STATE: 'STORE_SET_STATE',
  DEPUTIES_SET: 'DEPUTIES_SET',
  DEPUTIES_CHANGE: 'DEPUTIES_CHANGE',
  CONSTITUENCIES_SET: 'CONSTITUENCIES_SET',
  CONSTITUENCIES_CHANGE: 'CONSTITUENCIES_CHANGE',
  CONFIGS_CHANGE: 'CONFIGS_SET',
};

export default {
  store: {
    setState: state => ({ type: actionTypes.STORE_SET_STATE, state }),
  },
  deputies: {
    set: deputies => ({ type: actionTypes.DEPUTIES_SET, deputies }),
    change: item => ({ type: actionTypes.DEPUTIES_CHANGE, item }),
  },
  constituencies: {
    set: constituencies => ({ type: actionTypes.CONSTITUENCIES_SET, constituencies }),
    change: item => ({ type: actionTypes.CONSTITUENCIES_CHANGE, item }),
  },
  configs: {
    change: (name, val) => ({ type: actionTypes.CONFIGS_CHANGE, name, val }),
  },
};
