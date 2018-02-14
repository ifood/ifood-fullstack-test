import {all} from 'redux-saga/effects'
import formActionSaga from 'redux-form-saga'
import sagaFormFlow from './util/sagaForm'
import {unauthenticatedRequest} from './util/api'
import {searchOrders as SEARCH_ORDERS, searchItems as SEARCH_ITEMS} from './types'
import {encode as encodeUTF8} from 'utf8'
import {encode as encodeBase64} from 'base-64'

// -------- SEARCH_ORDERS
const searchOrdersApi = (payload) => {

  let params = '?';

  Object.keys(payload).filter(key => !!payload[key]).forEach(key => {
    params += `${key}=${payload[key]}&`
  });

  return unauthenticatedRequest('GET', `/orders/search${params.substring(0, params.length - 1)}`)
};
const validateSearchOrders = (payload) => {
  const {startDate, endDate, clientName, phone, email} = payload;

  return {
    startDate,
    endDate,
    clientName: urlSafeString(clientName),
    clientPhone: urlSafeString(phone),
    clientEmail: urlSafeString(email)
  }
};
const searchOrders = sagaFormFlow(
  SEARCH_ORDERS,
  validateSearchOrders,
  searchOrdersApi
);

// -------- SEARCH_ITEMS
const searchItemsApi = (payload) => {
  return unauthenticatedRequest('GET', `/orders/${payload.id}/items`)
};
const searchItems = sagaFormFlow(
  SEARCH_ITEMS,
  undefined,
  searchItemsApi
);


// -------- EXPORT
export default function *() {
  yield all([
    searchOrders.watcher(),
    searchItems.watcher(),
    formActionSaga()
  ])
}

const urlSafeString =(s) => {
  if (!s) return undefined;
  return encodeBase64(encodeUTF8(s));
};
