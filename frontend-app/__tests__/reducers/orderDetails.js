import * as reducers from "../../src/reducers/orderDetails";
import * as actionsTypes from "../../src/constants/actionTypes";
import { orders, searchParams, error, items } from "../../__mocks__/objectMocks";

const initialState = {
    orders: [],
    open: false,
};

describe("Order details reducer", () => {

    it("should return the initial state", () => {
        expect(reducers.default(undefined, {})).toEqual(initialState);
    });

    it("should handle ORDER_DETAILS_FETCH", () => {
        expect(reducers.default(undefined, {
            type: actionsTypes.ORDER_DETAILS_FETCH,
            searchParams,
        })).toEqual({
            searchParams,
            ...initialState
        });
    });

    it("should handle ORDER_DETAILS_SUCCESS", () => {
        expect(reducers.default(undefined, {
            type: actionsTypes.ORDER_DETAILS_SUCCESS,
            orders,
        })).toEqual(Object.assign({}, initialState, { orders }));
    });

    it("should handle ORDER_DETAILS_ERROR", () => {
        expect(reducers.default(undefined, {
            type: actionsTypes.ORDER_DETAILS_ERROR,
            error,
        })).toEqual(Object.assign({}, initialState, { error }));
    });

    it("should toggle order items modal to open", () => {
        expect(reducers.default(undefined, {
            type: actionsTypes.ORDER_ITEMS_MODAL_TOGGLE,
        })).toEqual(Object.assign({}, initialState, { open: true }));
    });

    it("should toggle order items modal to closed", () => {
        expect(reducers.default({ open: true }, {
            type: actionsTypes.ORDER_ITEMS_MODAL_TOGGLE,
        })).toEqual({ open: false });
    });

    it("should handle ORDER_ITEMS_FETCH", () => {
        expect(reducers.default(undefined, {
            type: actionsTypes.ORDER_ITEMS_FETCH,
            items,
        })).toEqual(Object.assign({}, initialState, { items }));
    });
});