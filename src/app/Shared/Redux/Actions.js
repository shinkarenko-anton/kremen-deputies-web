export const actionTypes = {
    STORE_SET_STATE: 'STORE_SET_STATE',
    DEPUTIES_SET: 'DEPUTIES_SET',
    DEPUTIES_CHANGE: 'DEPUTIES_CHANGE',
    CONFIGS_CHANGE: 'CONFIGS_SET',
}

export default {
    store: {
        setState: (state) => ({type: actionTypes.STORE_SET_STATE, state})
    },
    deputies: {
        set: (deputies) => ({type: actionTypes.DEPUTIES_SET, deputies}),
        change: (item) => ({type: actionTypes.DEPUTIES_CHANGE, item})
    },
    configs: {
        change: (name, val) => ({type: actionTypes.CONFIGS_CHANGE, name, val})
    }
};