import {
  MenuDefState,
  appDefState,
  changeVal,
  deskDefState,
  filesDefState,
  settingsDefState,
  sidepaneDefState,
  startmenuDefState,
  taskbarDefState,
} from "./defaultStates";

const combinedDefState = {
  ...deskDefState,
  ...appDefState,
  ...filesDefState,
  ...MenuDefState,
  ...settingsDefState,
  ...sidepaneDefState,
  ...startmenuDefState,
  ...taskbarDefState,
};

const combinedReducer = (state = combinedDefState, action) => {
  let tmpState = { ...state };
  let obj, keys;
  var navHist = false;
  let changed = false; // This is specific for settings reducer logic

  // Handling file-related actions first
  switch (action.type) {
    case "FILEDIR":
      tmpState.cdir = action.payload;
      break;
    case "FILEPATH":
      let pathid = tmpState.data.parsePath(action.payload);
      if (pathid) tmpState.cdir = pathid;
      break;
    case "FILEBACK":
      let item = tmpState.data.getId(tmpState.cdir);
      if (item.host) {
        tmpState.cdir = item.host.id;
      }
      break;
    case "FILEVIEW":
      tmpState.view = action.payload;
      break;
    case "FILEPREV":
      tmpState.hid--;
      if (tmpState.hid < 0) tmpState.hid = 0;
      navHist = true;
      break;
    case "FILENEXT":
      tmpState.hid++;
      if (tmpState.hid > tmpState.hist.length - 1)
        tmpState.hid = tmpState.hist.length - 1;
      navHist = true;
      break;
    default:
      break;
  }

  if (!navHist && tmpState.cdir !== tmpState.hist[tmpState.hid]) {
    tmpState.hist.splice(tmpState.hid + 1);
    tmpState.hist.push(tmpState.cdir);
    tmpState.hid = tmpState.hist.length - 1;
  }

  tmpState.cdir = tmpState.hist[tmpState.hid];
  if (tmpState.cdir.includes("%")) {
    if (tmpState.data.special[tmpState.cdir] != null) {
      tmpState.cdir = tmpState.data.special[tmpState.cdir];
      tmpState.hist[tmpState.hid] = tmpState.cdir;
    }
  }

  tmpState.cpath = tmpState.data.getPath(tmpState.cdir);

  // If it's a file-related action, return here
  if (action.type.startsWith("FILE")) {
    return tmpState;
  }

  // Handling other actions
  switch (action.type) {
    //apps and desktop
    case "DESKREM":
      var arr = state.apps.filter((x) => x.name !== action.payload);
      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, apps: arr };

    case "DESKADD":
      var arr = [...state.apps];
      arr.push(action.payload);
      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, apps: arr };

    case "DESKHIDE":
      return { ...state, hide: true };

    case "DESKSHOW":
      return { ...state, hide: false };

    case "DESKTOGG":
      return { ...state, hide: !state.hide };

    case "DESKSIZE":
      return { ...state, size: action.payload };

    case "DESKSORT":
      return { ...state, sort: action.payload || "none" };

    case "DESKABOUT":
      return { ...state, abOpen: action.payload };

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

    //menu.js
    case "MENUHIDE":
      tmpState.hide = true;
      break;
    case "MENUSHOW":
      tmpState.hide = false;
      tmpState.top = (action.payload && action.payload.top) || 272;
      tmpState.left = (action.payload && action.payload.left) || 430;
      tmpState.opts = (action.payload && action.payload.menu) || "desk";
      tmpState.attr = action.payload && action.payload.attr;
      tmpState.dataset = action.payload && action.payload.dataset;
      break;
    case "MENUCHNG":
      return {
        ...action.payload,
      };

    // settings.js
    case "STNGTHEME":
      changed = true;
      tmpState.person.theme = action.payload;
      break;
    case "STNGTOGG":
      changed = true;
      tmpState = changeVal(tmpState, action.payload);
      break;
    case "STNGSETV":
      changed = true;
      tmpState = changeVal(tmpState, action.payload.path, action.payload.value);
      break;
    case "SETTLOAD":
      tmpState = { ...action.payload };
      break;

    //sidepane.js:
    case "PANETHEM":
      tmpState = { ...state };
      tmpState.quicks[4].src = action.payload;
      return tmpState;

    case "BANDTOGG":
      return { ...state, banhide: !state.banhide };

    case "BANDHIDE":
      return { ...state, banhide: true };

    case "PANETOGG":
      return { ...state, hide: !state.hide };

    case "PANEHIDE":
      return { ...state, hide: true };

    case "CALNTOGG":
      return { ...state, calhide: !state.calhide };

    case "CALNHIDE":
      return { ...state, calhide: true };

    //sidemanu.js:
    case "STARTSHW":
      return {
        ...state,
        menu: true,
        hide: false,
        pwctrl: false,
      };
    case "STARTHID":
      return {
        ...state,
        hide: true,
        showAll: false,
        pwctrl: false,
      };
    case "STARTOGG":
      return {
        ...state,
        hide: !(state.hide || !state.menu),
        menu: true,
        alpha: false,
        curAlpha: "A",
        pwctrl: false,
        showAll: state.menu && state.showAll ? true : null,
      };
    case "STARTALL":
      return {
        ...state,
        showAll: !state.showAll,
        alpha: false,
        pwctrl: false,
        curAlpha: "A",
      };
    case "STARTALPHA":
      return {
        ...state,
        alpha: !state.alpha,
        pwctrl: false,
        curAlpha: action.payload || "A",
      };
    case "STARTSRC":
      return {
        ...state,
        hide: !(state.hide || state.menu),
        menu: false,
        pwctrl: false,
      };
    case "STARTPWC":
      return {
        ...state,
        pwctrl: true,
      };

    //taskbar.js:
    case "TASKADD":
      return state;
    case "TASKREM":
      return state;
    case "TASKCEN":
      return {
        ...state,
        align: "center",
      };
    case "TASKLEF":
      return {
        ...state,
        align: "left",
      };
    case "TASKTOG":
      return {
        ...state,
        align: state.align == "left" ? "center" : "left",
      };
    case "TASKPSHOW":
      return {
        ...state,
        prev: true,
        prevApp: (action.payload && action.payload.app) || "store",
        prevPos: (action.payload && action.payload.pos) || 50,
      };
    case "TASKPHIDE":
      return {
        ...state,
        prev: false,
      };
    case "TASKSRCH":
      return {
        ...state,
        search: action.payload == "true",
      };
    case "TASKWIDG":
      return {
        ...state,
        widgets: action.payload == "true",
      };
    case "TASKAUDO":
      return {
        ...state,
        audio: action.payload,
      };

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

export default combinedReducer;
