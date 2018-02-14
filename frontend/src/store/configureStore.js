import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import sagas from '../sagas'

const sagasMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagasMiddleware)
);

sagasMiddleware.run(sagas);

export default store;