import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(reducers, initialState);

  return store;
};

const store = configureStore();
export default store;
