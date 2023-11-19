import { combineReducers, createStore } from "redux";

import combinedReducer from "../actions/acts";
import folderAndFileReducer from "./folderAndFile";

const allReducers = combineReducers({
  combined: combinedReducer,
  folderAndFiles: folderAndFileReducer,
});

var store = createStore(allReducers);

export default store;
