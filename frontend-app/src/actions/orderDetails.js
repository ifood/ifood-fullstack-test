import * as types from "../constants/actionTypes";
import * as urls from "../constants/urls";
import { buildUrl } from "../utils/urlUtils";

export const receiveOrderDetails = (data) => {
    return {
        type: types.ORDER_DETAILS_SUCCESS,
        orders: data
    };
};

export const fetchOrderDetails = (searchParams) => {
    return dispatch => {
        const url = buildUrl("/api/v1/orders/details", urls.API_URL , searchParams);
        return fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Origin": "*"
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receiveOrderDetails(json)))
            .catch(error => dispatch(errorOrderDetails(error)))
    };
};

export const errorOrderDetails = (error) => {
    return {
        type: types.ORDER_DETAILS_ERROR,
        error
    };
};

export const toggleItemsModal = (open) => {
    return {
        type: types.ORDER_ITEMS_MODAL_TOGGLE
    };
};

export const fetchOrderItems = (items) => {
    return {
        type: types.ORDER_ITEMS_FETCH,
        items
    };
};