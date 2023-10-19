import {
  sidepaneDefState,
  startmenuDefState,
  taskbarDefState,
  wallpaperDefState,
  walls,
} from "./actsDefState";

const combined = {
  ...startmenuDefState,
  ...sidepaneDefState,
  ...taskbarDefState,
  ...wallpaperDefState,
};

const combinedReducer = (state = combined, action) => {
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
    default:
      return state;
  }
};

export default combinedReducer;
