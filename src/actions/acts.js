import {
  changeVal,
  deskDefState,
  filesDefState,
  menuDefState,
  settingsDefState,
  sidepaneDefState,
  startmenuDefState,
  taskbarDefState,
  wallpaperDefState,
  walls,
  widpaneDefState,
} from "./actsDefState";

const combined = {
  ...startmenuDefState,
  ...sidepaneDefState,
  ...taskbarDefState,
  ...wallpaperDefState,
  ...menuDefState,
  ...deskDefState,
  ...widpaneDefState,
  data: { ...filesDefState },
  ...settingsDefState,
};

const combinedReducer = (state = combined, action) => {
  console.log("Combined:", combined);
  var tmp = { ...state };
  var navHist = false;
  var tmpState = { ...state };
  var changed = false;
  switch (action.type) {
    case "PANETHEM":
      return {
        ...state,
        quicks: state.quicks.map((item, index) =>
          index === 4 ? { ...item, src: action.payload } : item
        ),
      };

    case "BANDTOGG":
      return {
        ...state,
        banhide: !state.banhide,
      };

    case "BANDHIDE":
      return {
        ...state,
        banhide: true,
      };

    case "PANETOGG":
      return {
        ...state,
        sidePaneHide: !state.sidePaneHide,
      };

    case "PANEHIDE":
      return {
        ...state,
        sidePaneHide: true,
      };

    case "CALNTOGG":
      return {
        ...state,
        calhide: !state.calhide,
      };

    case "CALNHIDE":
      return {
        ...state,
        calhide: true,
      };

    //startmanu.js:

    case "STARTSHW":
      return {
        ...state,
        menu: true,
        startMenuHide: false,
        pwctrl: false,
      };
    case "STARTHID":
      return {
        ...state,
        startMenuHide: true,
        showAll: false,
        pwctrl: false,
      };
    case "STARTOGG":
      return {
        ...state,
        startMenuHide: !(state.startMenuHide || !state.menu),
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
        startMenuHide: !(state.startMenuHide || state.menu),
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

    //wallpaper.js:

    case "WALLUNLOCK":
      localStorage.setItem("locked", false);
      return {
        ...state,
        locked: false,
        dir: 0,
      };
    case "WALLNEXT":
      var twps = (state.wps + 1) % walls.length;
      localStorage.setItem("wps", twps);
      return {
        ...state,
        wps: twps,
        src: walls[twps],
      };
    case "WALLALOCK":
      return {
        ...state,
        locked: true,
        dir: -1,
      };
    case "WALLBOOTED":
      return {
        ...state,
        booted: true,
        dir: 0,
        act: "",
      };
    case "WALLRESTART":
      return {
        ...state,
        booted: false,
        dir: -1,
        locked: true,
        act: "restart",
      };
    case "WALLSHUTDN":
      return {
        ...state,
        booted: false,
        dir: -1,
        locked: true,
        act: "shutdn",
      };
    case "WALLSET":
      var isIndex = !Number.isNaN(parseInt(action.payload)),
        wps = 0,
        src = "";

      if (isIndex) {
        wps = localStorage.getItem("wps");
        src = walls[wps] ? walls[wps] : walls[0];
      } else {
        const idx = walls.findIndex((item) => item === action.payload);
        localStorage.setItem("wps", idx);
        src = action.payload;
        wps = walls[idx];
      }

      return {
        ...state,
        wps: wps,
        src: src,
      };

    //desktop.js:

    case "DESKREM":
      var arr = state.dskApps.filter((x) => x.name !== action.payload);

      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, dskApps: arr };
    case "DESKADD":
      arr.push(action.payload);

      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, dskApps: arr };
    case "DESKHIDE":
      return {
        ...state,
        dskHide: true,
      };
    case "DESKSHOW":
      return {
        ...state,
        dskHide: false,
      };
    case "DESKTOGG":
      return {
        ...state,
        dskHide: !state.dskHide,
      };
    case "DESKSIZE":
      return {
        ...state,
        size: action.payload,
      };
    case "DESKSORT":
      return {
        ...state,
        sort: action.payload || "none",
      };
    case "DESKABOUT":
      return {
        ...state,
        abOpen: action.payload,
      };

    //menu.js:
    case "MENUHIDE":
      return {
        ...state,
        menuHide: true,
      };
    case "MENUSHOW":
      return {
        ...state,
        menuHide: false,
        top: (action.payload && action.payload.top) || 272,
        left: (action.payload && action.payload.left) || 430,
        opts: (action.payload && action.payload.menu) || "desk",
        attr: action.payload && action.payload.attr,
        dataset: action.payload && action.payload.dataset,
      };
    case "MENUCHNG":
      return {
        ...action.payload,
      };

    //widpane.js:
    case "WIDGHIDE":
      return {
        ...state,
        widpaneHide: true,
      };
    case "WIDGTOGG":
      return {
        ...state,
        widpaneHide: !state.widpaneHide,
      };
    case "WIDGREST":
      return action.payload;

    //files:
    case "FILEDIR":
      tmp.data.cdir = action.payload;
      break;
    case "FILEPATH":
      var pathid = tmp.data.fdata.parsePath(action.payload);
      if (pathid) {
        tmp.data.cdir = pathid;
      }
      break;
    case "FILEBACK":
      var item = tmp.data.fdata.getId(tmp.data.cdir);
      if (item && item.host) {
        tmp.data.cdir = item.host.id;
      }
      break;
    case "FILEVIEW":
      tmp.data.view = action.payload;
      break;
    case "FILEPREV":
      tmp.data.hid--;
      if (tmp.data.hid < 0) tmp.data.hid = 0;
      navHist = true;
      break;
    case "FILENEXT":
      tmp.data.hid++;
      if (tmp.data.hid > tmp.data.hist.length - 1) {
        tmp.data.hid = tmp.data.hist.length - 1;
      }
      navHist = true;
      break;

    //settings:

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

    default:
      if (!navHist && tmp.data.cdir !== tmp.data.hist[tmp.data.hid]) {
        tmp.data.hist.splice(tmp.data.hid + 1);
        tmp.data.hist.push(tmp.data.cdir);
        tmp.data.hid = tmp.data.hist.length - 1;
      }

      tmp.data.cpath = tmp.data.fdata.getPath(tmp.data.cdir);

      if (tmp.data.cdir.includes("%")) {
        if (
          tmp.data.fdata.special &&
          tmp.data.fdata.special[tmp.data.cdir] != null
        ) {
          tmp.data.cdir = tmp.data.fdata.special[tmp.data.cdir];
        }
      }
      if (changed) localStorage.setItem("setting", JSON.stringify(tmpState));

      return tmp;
  }

  return tmp;
};

export default combinedReducer;
