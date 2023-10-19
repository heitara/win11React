import { allApps } from "../utils";

var dev = "";
if (import.meta.env.MODE == "development") {
  dev = ""; // set the name (lowercase) of the app you are developing so that it will be opened on refresh
}

const defState = {};
for (let i = 0; i < allApps.length; i++) {
  defState[allApps[i].icon] = allApps[i];
  defState[allApps[i].icon].size = "full";
  defState[allApps[i].icon].hide = true;
  defState[allApps[i].icon].max = null;
  defState[allApps[i].icon].z = 0;

  if (allApps[i].icon == dev) {
    defState[allApps[i].icon].size = "mini";
    defState[allApps[i].icon].hide = false;
    defState[allApps[i].icon].max = true;
    defState[allApps[i].icon].z = 1;
  }
}

defState.hz = 2;

const appReducer = (state = defState, action) => {
  // console.log("State", state);
  // console.log("Action", action);
  let tmpState = { ...state };
  let obj, keys;

  switch (action.type) {
    case "EDGELINK":
      obj = { ...tmpState["edge"] };
      if (action.payload && action.payload.startsWith("http")) {
        obj.url = action.payload;
      } else if (action.payload && action.payload.length !== 0) {
        obj.url = "https://www.bing.com/search?q=" + action.payload;
      } else {
        obj.url = null;
      }
      obj.size = "full";
      obj.hide = false;
      obj.max = true;
      tmpState.hz += 1;
      obj.z = tmpState.hz;
      tmpState["edge"] = obj;
      return tmpState;

    case "SHOWDSK":
      keys = Object.keys(tmpState);
      for (let key of keys) {
        obj = tmpState[key];
        if (!obj.hide) {
          obj.max = false;
          if (obj.z === tmpState.hz) {
            tmpState.hz -= 1;
          }
          obj.z = -1;
          tmpState[key] = obj;
        }
      }
      return tmpState;

    case "EXTERNAL":
      window.open(action.payload, "_blank");
      return state;

    case "OPENTERM":
      obj = { ...tmpState["terminal"] };
      obj.dir = action.payload;
      obj.size = "full";
      obj.hide = false;
      obj.max = true;
      tmpState.hz += 1;
      obj.z = tmpState.hz;
      tmpState["terminal"] = obj;
      return tmpState;

    case "ADDAPP":
      tmpState[action.payload.icon] = action.payload;
      tmpState[action.payload.icon].size = "full";
      tmpState[action.payload.icon].hide = true;
      tmpState[action.payload.icon].max = null;
      tmpState[action.payload.icon].z = 0;
      return tmpState;

    case "DELAPP":
      delete tmpState[action.payload];
      return tmpState;

    default:
      keys = Object.keys(state);
      for (let key of keys) {
        obj = state[key];
        if (obj.action === action.type) {
          tmpState = { ...state };
          switch (action.payload) {
            case "full":
              obj.size = "full";
              obj.hide = false;
              obj.max = true;
              tmpState.hz += 1;
              obj.z = tmpState.hz;
              break;
            case "close":
              obj.hide = true;
              obj.max = null;
              obj.z = -1;
              tmpState.hz -= 1;
              break;
            case "mxmz":
              obj.size = obj.size !== "full" ? "full" : "mini";
              obj.hide = false;
              obj.max = true;
              tmpState.hz += 1;
              obj.z = tmpState.hz;
              break;
            case "togg":
              obj.hide = false;
              if (obj.z !== tmpState.hz) {
                obj.max = true;
                tmpState.hz += 1;
                obj.z = tmpState.hz;
              } else {
                obj.max = !obj.max;
                tmpState.hz = obj.max ? tmpState.hz + 1 : tmpState.hz - 1;
              }
              break;
            case "mnmz":
              obj.max = false;
              obj.hide = false;
              if (obj.z === tmpState.hz) {
                tmpState.hz -= 1;
              }
              obj.z = -1;
              break;
            case "resize":
              obj.size = "cstm";
              obj.hide = false;
              obj.max = true;
              if (obj.z !== tmpState.hz) tmpState.hz += 1;
              obj.z = tmpState.hz;
              obj.dim = action.dim;
              break;
            case "front":
              obj.hide = false;
              obj.max = true;
              if (obj.z !== tmpState.hz) {
                tmpState.hz += 1;
                obj.z = tmpState.hz;
              }
              break;
            default:
              break;
          }
          tmpState[key] = obj;
          return tmpState;
        }
      }
      return state;
  }
};

export default appReducer;
