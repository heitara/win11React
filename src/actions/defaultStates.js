import {
  allApps,
  desktopApps,
  pinnedApps,
  recentApps,
  taskApps,
} from "../utils";
import { Bin } from "../utils/bin";
import fdata from "./dir.json";

//============================================
// Initial state from desktop.js
export const deskDefState = {
  apps: desktopApps,
  hide: false,
  size: 1,
  sort: "none",
  abOpen: false,
};

//============================================
// Initial state from apps.jsvar dev = "";

var dev = "";
if (import.meta.env.MODE == "development") {
  dev = ""; // set the name (lowercase) of the app you are developing so that it will be opened on refresh
}

export const appDefState = {};
for (let i = 0; i < allApps.length; i++) {
  appDefState[allApps[i].icon] = allApps[i];
  appDefState[allApps[i].icon].size = "full";
  appDefState[allApps[i].icon].hide = true;
  appDefState[allApps[i].icon].max = null;
  appDefState[allApps[i].icon].z = 0;

  if (allApps[i].icon == dev) {
    appDefState[allApps[i].icon].size = "mini";
    appDefState[allApps[i].icon].hide = false;
    appDefState[allApps[i].icon].max = true;
    appDefState[allApps[i].icon].z = 1;
  }
}
appDefState.hz = 2;

//============================================
// Initial state from files.js
export const filesDefState = {
  cdir: "%user%",
  hist: [],
  hid: 0,
  view: 1,
};

filesDefState.hist.push(filesDefState.cdir);
filesDefState.data = new Bin();
filesDefState.data.parse(fdata);

//============================================
// Initial state from menu.js

export const MenuDefState = {
  hide: true,
  top: 80,
  left: 360,
  opts: "desk",
  attr: null,
  dataset: null,
  data: {
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

//============================================
// Initial state from settings.js

export const settingsDefState = {
  system: {
    power: {
      saver: {
        state: false,
      },
      battery: 100,
    },
    display: {
      brightness: 100,
      nightlight: {
        state: false,
      },
      connect: false,
    },
  },
  person: {
    name: "Blue Edge",
    theme: "light",
    color: "blue",
  },
  devices: {
    bluetooth: false,
  },
  network: {
    wifi: {
      state: true,
    },
    airplane: false,
  },
  privacy: {
    location: {
      state: false,
    },
  },
};

document.body.dataset.theme = settingsDefState.person.theme;

export const changeVal = (obj, path, val = "togg") => {
  var tmp = obj;
  path = path.split(".");
  for (var i = 0; i < path.length - 1; i++) {
    tmp = tmp[path[i]];
  }

  if (val == "togg") {
    tmp[path[path.length - 1]] = !tmp[path[path.length - 1]];
  } else {
    tmp[path[path.length - 1]] = val;
  }

  return obj;
};

//============================================
// Initial state from sidepane.js

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
  hide: true,
  banhide: true,
  calhide: true,
};

//============================================
//startmenu.js:

export const startmenuDefState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  hide: true,
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

//============================================
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
