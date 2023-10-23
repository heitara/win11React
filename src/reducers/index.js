import { combineReducers, createStore } from "redux";

import combinedReducer from "../actions/acts";
import appReducer from "./apps";
import deskReducer from "./desktop";
import fileReducer from "./files";
import folderAndFileReducer from "./folderAndFile";
import globalReducer from "./globals";
import menusReducer from "./menu";
import settReducer from "./settings";
import widReducer from "./widpane";

const allReducers = combineReducers({
  desktop: deskReducer,
  combined: combinedReducer,
  widpane: widReducer,
  apps: appReducer,
  // menus: menusReducer,
  globals: globalReducer,
  setting: settReducer,
  files: fileReducer,
  folderAndFiles: folderAndFileReducer,
});

var store = createStore(allReducers);

export default store;
