import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import heroesReducer from "../reducers/heroesReducer";
import filtersReducer from "../reducers/filtersReducer";
import ReduxThunk from "redux-thunk";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
} 

const enhancer = (createStore) => {
  return (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({ type: action });
      }
      return oldDispatch(action);
    };
    return store;
  };
};

const store = createStore(
  combineReducers({
    heroesReducer,
    filtersReducer,
  }), 
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
//  

export default store;
