import { sidepaneDefState, startmenuDefState } from "./actsDefState";

const combined = {
  ...startmenuDefState,
  ...sidepaneDefState,
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

    default:
      return state;
  }
};

export default combinedReducer;
