import {
  GET_ORDERS_LIST_START,
  GET_ORDERS_LIST_FAIL,
  GET_ORDERS_LIST_SUCCESS,

  SET_SELECTED_ORDER
  
} from './types';

import endPoints from '../api/endPoints';
import { request } from '../api';
import orders from './mock/orders.json'
import { serialize } from '../utils/utils'

export const getOrderList = (params) => {
  return (dispatch) => {
    dispatch({ type: GET_ORDERS_LIST_START });
    const endPoint = `${endPoints().orderList}${serialize(params)}`;   
    console.log(endPoint)
    request(endPoint)
      .then(response => {            
        dispatch({ type: GET_ORDERS_LIST_SUCCESS, payload: response.data });
      })
      .catch(error => {           
        dispatch({ type: GET_ORDERS_LIST_FAIL, payload: error.response })
      })
  }
};

export const setSelectedOrder = (order) => {
  return (dispatch) => {            
    localStorage.setItem('selectedOrderId', order._id);      
    dispatch({ type: SET_SELECTED_ORDER, payload: order });      
  }
};
