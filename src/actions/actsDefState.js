import {
  allApps,
  desktopApps,
  pinnedApps,
  recentApps,
  taskApps,
} from "../utils";

import { Bin } from "../utils/bin";
import fdata from "./dir.json";

import * as history from "./history.json";
import * as news from "./news.json";

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
  apps: desktopApps,
  hide: false,
  size: 1,
  sort: "none",
  abOpen: false,
};

//menu.js:
export const menuDefState = {
  menuHide: true,
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
      ispace: false,
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
            payload: "New Folder",
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

//widpane:
var hisTemp = history.default;

var date = new Date(),
  event = hisTemp[Math.floor(Math.random() * hisTemp.length)];
date.setYear(event.year);

var newsList = [];
for (var i = 0; i < news.default.articles.length; i++) {
  var item = {
    ...news.default.articles[i],
  };
  item.title = item.title
    .split("-")
    .reverse()
    .splice(1)
    .reverse()
    .join("-")
    .trim();
  newsList.push(item);
}

var abbr = ["sn", "sl", "h", "t", "hr", "lr", "s", "hc", "lc", "c"],
  wstates = [
    "Snow",
    "Sleet",
    "Hail",
    "Thunderstorm",
    "Heavy Rain",
    "Light Rain",
    "Showers",
    "Heavy Cloud",
    "Light Cloud",
    "Clear",
  ];

var rem = null;

const getRandom = (x = 10, rm = 0) => {
  if (rem != null) {
    var tmp = rem;
    rem = null;
    return tmp;
  } else if (rm) {
    rem = Math.floor(Math.random() * x);
    return rem;
  }

  return Math.floor(Math.random() * x);
};

export const widpaneDefState = {
  widpaneData: {
    weather: {
      city: "New Delhi",
      country: "India",
      wstate: wstates[getRandom(10, 1)],
      icon: abbr[getRandom()],
      temp: 30 + getRandom(20),
      rain: 10 + getRandom(80),
      wind: 4 + getRandom(5),
      days: [0, 1, 2, 3].map((i) => {
        return {
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            (new Date().getDay() + i) % 7
          ],
          icon: abbr[getRandom(10)],
          min: 30 + getRandom(10),
          max: 40 + getRandom(10),
        };
      }),
    },
    stock: [
      [
        Number(
          parseFloat(2300 + Math.random() * 200).toFixed(2)
        ).toLocaleString(),
        parseFloat(Math.random() * 2).toFixed(2),
        Math.round(Math.random()),
      ],
      [
        Number(
          parseFloat(600 + Math.random() * 200).toFixed(2)
        ).toLocaleString(),
        parseFloat(Math.random() * 2).toFixed(2),
        Math.round(Math.random()),
      ],
    ],
    date: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    event: event,
    news: newsList,
  },
  widpaneHide: true,
};

//files:
export const filesDefState = {
  cdir: "%user%",
  hist: [],
  hid: 0,
  view: 1,
};

filesDefState.hist.push(filesDefState.cdir);
filesDefState.fdata = new Bin();
filesDefState.fdata.parse(fdata);

//settings:
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

//globals:

export const globalsDefState = {
  lays: [
    [
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: "50%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "66%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "34%",
          height: "100%",
          top: 0,
          left: "66%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "33%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "34%",
          height: "100%",
          top: 0,
          left: "33%",
        },
        br: 1,
      },
      {
        dim: {
          width: "33%",
          height: "100%",
          top: 0,
          left: "67%",
        },
        br: 15,
      },
    ],
    [
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: "50%",
        },
        br: 3,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: "50%",
        },
        br: 5,
      },
    ],
    [
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: 0,
        },
        br: 2,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: 0,
          left: "50%",
        },
        br: 3,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: 0,
        },
        br: 7,
      },
      {
        dim: {
          width: "50%",
          height: "50%",
          top: "50%",
          left: "50%",
        },
        br: 5,
      },
    ],
    [
      {
        dim: {
          width: "25%",
          height: "100%",
          top: 0,
          left: 0,
        },
        br: 14,
      },
      {
        dim: {
          width: "50%",
          height: "100%",
          top: 0,
          left: "25%",
        },
        br: 1,
      },
      {
        dim: {
          width: "25%",
          height: "100%",
          top: 0,
          left: "75%",
        },
        br: 15,
      },
    ],
  ],
  ribbon: [
    "luca",
    "unescape",
    "essential apps",
    "xbox gamepass",
    "spotify",
    "social media",
    "security",
    "utility apps",
    "forza horizon",
    "kids apps",
  ],
  apprib: [
    "netflix",
    "whatsApp",
    "telegram",
    "facebook",
    "amazon prime",
    "office",
    "lightroom",
  ],
  gamerib: [
    "call of duty",
    "cyberpunk 2077",
    "minecraft",
    "battle field v",
    "far cry 5",
    "hitman 3",
    "residental evil",
  ],
  movrib: [
    "antman",
    "godzilla vs kong",
    "tom and jerry",
    "wrath of man",
    "john wick",
    "wonder woman 1984",
    "nobody",
  ],
};

//apps:
var dev = "";
if (import.meta.env.MODE == "development") {
  dev = ""; // set the name (lowercase) of the app you are developing so that it will be opened on refresh
}

export const appsDefState = {};
for (let i = 0; i < allApps.length; i++) {
  appsDefState[allApps[i].icon] = allApps[i];
  appsDefState[allApps[i].icon].size = "full";
  appsDefState[allApps[i].icon].hide = true;
  appsDefState[allApps[i].icon].max = null;
  appsDefState[allApps[i].icon].z = 0;

  if (allApps[i].icon == dev) {
    appsDefState[allApps[i].icon].size = "mini";
    appsDefState[allApps[i].icon].hide = false;
    appsDefState[allApps[i].icon].max = true;
    appsDefState[allApps[i].icon].z = 1;
  }
}

appsDefState.hz = 2;

//FolderAndFile:

export const fileAndFolderDefState = {
  files: [],
};
