import {createFormAction} from 'redux-form-saga'

export const searchOrders = createFormAction('SEARCH_ORDERS');
export const searchItems = createFormAction('SEARCH_ITEMS');
export const ITEMS_MODAL = 'ITEMS_MODAL';