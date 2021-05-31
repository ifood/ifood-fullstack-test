import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import * as actions from "../../src/actions/orderDetails";
import * as actionsTypes from "../../src/constants/actionTypes";
import * as urls from "../../src/constants/urls";
import { buildUrl } from "../../src/utils/urlUtils";
import { orders, searchParams, error } from "../../__mocks__/objectMocks";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("Test Order Details actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    beforeEach(() => {
        store.clearActions();
    });

    it("should dispatch to ORDER_DETAILS_SUCCESS after fetch success", () => {
        const expectedActions = [
            { type: actionsTypes.ORDER_DETAILS_SUCCESS, orders: orders }
        ];

        const url = buildUrl("/api/v1/orders/details", urls.API_URL, searchParams);
        fetchMock.getOnce(url.toString(), orders);

        store.dispatch(actions.fetchOrderDetails(searchParams)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should dispatch to ORDER_DETAILS_ERROR after fetch error", () => {
        const expectedActions = [
            { type: actionsTypes.ORDER_DETAILS_ERROR, error }
        ];

        const url = buildUrl("/api/v1/orders/details", urls.API_URL, searchParams);
        fetchMock.getOnce(url.toString(), () => {
            throw error;
        });

        store.dispatch(actions.fetchOrderDetails(searchParams)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should dispatch to ORDER_ITEMS_MODAL_TOGGLE", () => {
        const expectedActions = [
            { type: actionsTypes.ORDER_ITEMS_MODAL_TOGGLE }
        ];

        store.dispatch(actions.toggleItemsModal(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch to ORDER_ITEMS_FETCH", () => {
        const items = orders;
        const expectedActions = [
            { type: actionsTypes.ORDER_ITEMS_FETCH, items },
        ];

        store.dispatch(actions.fetchOrderItems(items));
        expect(store.getActions()).toEqual(expectedActions);
    });


});
