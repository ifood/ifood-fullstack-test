import { combineReducers } from 'redux';
import orderReducer from './order';
import themeReducer from './theme';

export default combineReducers({
    orderReducer,
    themeReducer,
});
