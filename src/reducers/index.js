import { combineReducers, createStore } from "redux";

import combinedReducer from "../actions/acts";

const allReducers = combineReducers({
  combined: combinedReducer,
});

var store = createStore(allReducers);

export default store;
