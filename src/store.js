// store.js

import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import tokenReducer from './reducers/tokenReducer';

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer
});

const store = createStore(rootReducer);

export default store;
