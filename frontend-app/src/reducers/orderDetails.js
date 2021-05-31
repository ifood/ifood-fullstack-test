import {
    ORDER_DETAILS_FETCH,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_ERROR,
    ORDER_ITEMS_MODAL_TOGGLE,
    ORDER_ITEMS_FETCH
} from "../constants/actionTypes";

const initialState = {
    orders: [],
    open: false
};

const orderDetails = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case ORDER_DETAILS_FETCH:
            newState.searchParams = action.searchParams; //this shouldn't be working
            return Object.assign({}, state, newState);

        case ORDER_DETAILS_SUCCESS:
            newState.orders = action.orders;
            return Object.assign({}, state, newState);

        case ORDER_DETAILS_ERROR:
            newState.error = action.error;
            return Object.assign({}, state, newState);

        case ORDER_ITEMS_MODAL_TOGGLE:
            newState.open = !state.open;
            return Object.assign({}, state, newState);

        case ORDER_ITEMS_FETCH:
            newState.items = action.items;
            return Object.assign({}, state, newState);

        default:
            return state;
    }
}

export default orderDetails