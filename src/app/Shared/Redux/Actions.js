export const actionTypes = {
    STORE_SET_STATE: 'STORE_SET_STATE',
    DEPUTIES_CHANGE: 'DEPUTIES_CHANGE',
}

export default {
    store: {
        setState: (state) => ({type: actionTypes.STORE_SET_STATE, state})
    },
    deputies: {
        change: (item) => ({type: actionTypes.DEPUTIES_CHANGE, item})
    }
};