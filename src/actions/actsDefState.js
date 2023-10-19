import { pinnedApps, recentApps } from "../utils";

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
