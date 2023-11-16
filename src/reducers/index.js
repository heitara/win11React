import { combineReducers, createStore } from "redux";

import combinedReducer from "../actions/acts";
// import deskReducer from "./desktop";
import folderAndFileReducer from "./folderAndFile";

const allReducers = combineReducers({
  // desktop: deskReducer,
  combined: combinedReducer,
  folderAndFiles: folderAndFileReducer,
});

var store = createStore(allReducers);

export default store;
