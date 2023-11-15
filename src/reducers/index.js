import { combineReducers, createStore } from "redux";

import combinedReducer from "../actions/acts";
import appReducer from "./apps";
// import deskReducer from "./desktop";
import folderAndFileReducer from "./folderAndFile";
import globalReducer from "./globals";
import settReducer from "./settings";

const allReducers = combineReducers({
  // desktop: deskReducer,
  combined: combinedReducer,
  apps: appReducer,
  globals: globalReducer,
  setting: settReducer,
  folderAndFiles: folderAndFileReducer,
});

var store = createStore(allReducers);

export default store;
