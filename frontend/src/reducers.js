import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {searchOrders as SEARCH_ORDERS, searchItems as SEARCH_ITEMS, ITEMS_MODAL} from './types'

const error = (state, action) => {

  if (!state){
    state = {
      searchMessage: '',
      itemsMessage: ''
    }
  }

  switch (action.type) {
    case SEARCH_ORDERS.SUCCESS:
      return {
        searchMessage: ''
      };
    case SEARCH_ORDERS.FAILURE:
      return {
        searchMessage: action.payload
      };
    case SEARCH_ITEMS.SUCCESS:
      return {
        itemsMessage: ''
      };
    case SEARCH_ITEMS.FAILURE:
      return {
        itemsMessage: action.payload
      };
    default:
      return state
  }
};
const orders = (state, action) => {

  if (!state){
    state = {
      list: [],
      retrieved: false,
      modal: {
        visible: false,
        data: {},
        items: []
      }
    }
  }

  switch (action.type) {
    case SEARCH_ORDERS.SUCCESS:
      return {
        ...state,
        list: action.payload,
        retrieved: true
      };
    case SEARCH_ITEMS.SUCCESS:
      return {
        ...state,
        modal: {
          ...state.modal,
          items: action.payload
        }
      };
    case ITEMS_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          visible: action.visible,
          data: action.data,
          items: []
        }
      };
    default:
      return state
  }
};

export default combineReducers({
  orders,
  error,
  form: formReducer
});