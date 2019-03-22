import { combineReducers } from 'redux';

import OrdersReducer from './OrdersReducer';

export default combineReducers({
  orders: OrdersReducer,
});