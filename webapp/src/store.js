import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger }   from 'redux-logger'
import { orderReducer } from './reducers/orderReducer'
import { filterReducer } from './reducers/filterReducer'
import thunk from 'redux-thunk'

const middleware = applyMiddleware( thunk)

export default createStore(
  combineReducers({
    filter: filterReducer,
    order: orderReducer
  }),
  middleware
)
