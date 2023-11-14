import { desktopApps, pinnedApps, recentApps, taskApps } from "../utils";

import { Bin } from "../utils/bin";
import fdata from "./dir.json";

//startmenu.js:

export const startmenuDefState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  startMenuHide: true,
  menu: false,
  showAll: false,
  alpha: false,
  pwctrl: false,
  curAlpha: "A",
  qksrch: [
    ["faClock", 1, "Today in history"],
    ["faChartLine", null, "Markets today"],
    ["faFilm", null, "New movies"],
    ["faNewspaper", 1, "Top news"],
  ],
};

//sidepane.js:

export const sidepaneDefState = {
  quicks: [
    {
      ui: true,
      src: "wifi",
      name: "WiFi",
      state: "network.wifi.state",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "bluetooth",
      name: "Bluetooth",
      state: "devices.bluetooth",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "airplane",
      name: "Flight Mode",
      state: "network.airplane",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "saver",
      name: "Battery Saver",
      state: "system.power.saver.state",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "sun",
      name: "Theme",
      state: "person.theme",
      action: "changeTheme",
    },
    {
      ui: true,
      src: "nightlight",
      name: "Night Light",
      state: "system.display.nightlight.state",
      action: "STNGTOGG",
    },
  ],
  sidePaneHide: true,
  banhide: true,
  calhide: true,
};

//taskbar.js:

export const taskbarDefState = {
  apps: taskApps,
  prev: false,
  prevApp: "",
  prevPos: 0,
  align: "center",
  search: true,
  widgets: true,
  audio: 3,
};

//wallpaper.js:

var wps = localStorage.getItem("wps") || 0;
var locked = localStorage.getItem("locked");

export const walls = [
  "default/img0.jpg",
  "dark/img0.jpg",
  "ThemeA/img0.jpg",
  "ThemeA/img1.jpg",
  "ThemeA/img2.jpg",
  "ThemeA/img3.jpg",
  "ThemeB/img0.jpg",
  "ThemeB/img1.jpg",
  "ThemeB/img2.jpg",
  "ThemeB/img3.jpg",
  "ThemeC/img0.jpg",
  "ThemeC/img1.jpg",
  "ThemeC/img2.jpg",
  "ThemeC/img3.jpg",
  "ThemeD/img0.jpg",
  "ThemeD/img1.jpg",
  "ThemeD/img2.jpg",
  "ThemeD/img3.jpg",
];

const themes = ["default", "dark", "ThemeA", "ThemeB", "ThemeD", "ThemeC"];

export const wallpaperDefState = {
  themes: themes,
  wps: wps,
  src: walls[wps],
  locked: !(locked == "false"),
  booted: import.meta.env.MODE == "development",
  act: "",
  dir: 0,
};

//desktop.js:
export const deskDefState = {
  dskApps: desktopApps,
  dskHide: false,
  size: 1,
  sort: "none",
  abOpen: false,
};

//menu.js:
export const menuDefState = {
  menuHide: true, //changed
  top: 80,
  left: 360,
  opts: "desk",
  attr: null,
  dataset: null,
  newData: {
    desk: {
      width: "310px",
      secwid: "200px",
    },
    task: {
      width: "220px",
      secwid: "120px",
      ispace: false, // show the space for icons in menu
    },
    app: {
      width: "310px",
      secwid: "200px",
    },
  },
  menus: {
    desk: [
      {
        name: "View",
        icon: "view",
        type: "svg",
        opts: [
          {
            name: "Large icons",
            action: "changeIconSize",
            payload: "large",
          },
          {
            name: "Medium icons",
            action: "changeIconSize",
            payload: "medium",
          },
          {
            name: "Small icons",
            action: "changeIconSize",
            payload: "small",
            dot: true,
          },
          {
            type: "hr",
          },
          {
            name: "Show desktop icons",
            action: "deskHide",
            check: true,
          },
        ],
      },
      {
        name: "Sort by",
        icon: "sort",
        type: "svg",
        opts: [
          {
            name: "Name",
            action: "changeSort",
            payload: "name",
          },
          {
            name: "Size",
            action: "changeSort",
            payload: "size",
          },
          {
            name: "Date modified",
            action: "changeSort",
            payload: "date",
          },
        ],
      },
      {
        name: "Refresh",
        action: "refresh",
        type: "svg",
        icon: "refresh",
      },
      {
        type: "hr",
      },
      {
        //The file and folder creation:
        name: "New",
        icon: "New",
        type: "svg",
        opts: [
          {
            name: "Folder",
            action: "CREATE_FOLDER",
            payload: {},
          },
          {
            name: "Text Document",
            action: "NOTEPAD",
            payload: "full",
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "Display settings",
        icon: "display",
        type: "svg",
        action: "SETTINGS",
        payload: "full",
      },
      {
        name: "Personalize",
        icon: "personalize",
        type: "svg",
        action: "SETTINGS",
        payload: "full",
      },
      {
        type: "hr",
      },
      {
        name: "Next desktop background",
        action: "WALLNEXT",
      },
      {
        name: "Open in Terminal",
        icon: "terminal",
        action: "OPENTERM",
        payload: "C:\\Users\\Blue\\Desktop",
      },
      {
        name: "About",
        action: "DESKABOUT",
        icon: "win/info",
        payload: true,
      },
    ],
    task: [
      {
        name: "Align icons",
        opts: [
          {
            name: "Left",
            action: "changeTaskAlign",
            payload: "left",
          },
          {
            name: "Center",
            action: "changeTaskAlign",
            payload: "center",
            dot: true,
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "Search",
        opts: [
          {
            name: "Show",
            action: "TASKSRCH",
            payload: true,
          },
          {
            name: "Hide",
            action: "TASKSRCH",
            payload: false,
          },
        ],
      },
      {
        name: "Widgets",
        opts: [
          {
            name: "Show",
            action: "TASKWIDG",
            payload: true,
          },
          {
            name: "Hide",
            action: "TASKWIDG",
            payload: false,
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "Show Desktop",
        action: "SHOWDSK",
      },
    ],
    app: [
      {
        name: "Open",
        action: "performApp",
        payload: "open",
      },
      {
        name: "Run as administrator",
        action: "performApp",
        payload: "open",
        icon: "win/shield",
      },
      {
        name: "Open file location",
        dsb: true,
      },
      {
        name: "Unpin from start",
        dsb: true,
      },
      {
        name: "Compress to Zip file",
        dsb: true,
      },
      {
        name: "Copy as path",
        dsb: true,
      },
      {
        name: "Properties",
        dsb: true,
      },
      {
        type: "hr",
      },
      {
        name: "Delete shortcut",
        action: "performApp",
        payload: "delshort",
      },
      {
        name: "Delete",
        action: "delApp",
        payload: "delete",
      },
    ],
  },
};

//files:
// export const filesDefState = {
//   data: {
//     cdir: "",
//     hist: [],
//     hid: 0,
//     view: 1,
//     bin: new Bin(),
//   },
// };

// filesDefState.data.hist.push(filesDefState.data.cdir);
// filesDefState.data.bin.parse(fdata);

// export const filesDefState = {
//   data: {
//     cdir: "%user%",
//     hist: ["%user%"], // Initialize with the default cdir in history
//     hid: 0,
//     view: 1,
//     bin: new Bin()
//   }
// };

// filesDefState.data.bin.parse(fdata);

// const binInstance = new Bin();
// binInstance.parse(fdata);

// const userSpecialId = binInstance.special["%user%"];

// export const filesDefState = {
//   data: {
//     cdir: userSpecialId,
//     hist: ["%user%", userSpecialId],
//     hid: 1,
//     view: 1,
//     bin: binInstance,
//     cpath: "C:\\Users\\Blue",
//   },
// };

export const filesDefState = {
  cdir: "%user%",
  hist: [],
  hid: 0,
  view: 1,
};

filesDefState.hist.push(filesDefState.cdir);
filesDefState.fdata = new Bin();
filesDefState.fdata.parse(fdata);
