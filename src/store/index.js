import heroesReducer from "../components/heroesList/heroesSlice";
import filtersReducer from "../reducers/filtersReducer";
import { configureStore } from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

// const enhancer = (createStore) => {
//   return (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({ type: action });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };
// };

// const store = createStore(
//   combineReducers({
//     heroesReducer,
//     filtersReducer,
//   }),
//   compose(
//     applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
//

const store = configureStore({
  reducer: {
    heroesReducer,
    filtersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware) 
});

export default store;
 