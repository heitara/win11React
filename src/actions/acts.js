import {
  appsDefState,
  changeVal,
  deskDefState,
  fileAndFolderDefState,
  filesDefState,
  globalsDefState,
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
  desktop: { ...deskDefState },
  ...widpaneDefState,
  data: { ...filesDefState },
  ...settingsDefState,
  ...globalsDefState,
  application: { ...appsDefState },
  ...fileAndFolderDefState,
  terminalOutput: "",
};

const combinedReducer = (state = combined, action) => {
  console.log("action:", action);
  // console.log("Combined:", state);
  var tmp = { ...state };
  var navHist = false;
  var tmpState = { ...state };
  var changed = false;
  var appsTemp = { ...state.application };
  let obj, keys;
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
      var arr = state.apps.filter((x) => x.name !== action.payload);

      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, apps: arr };
    case "DESKADD":
      arr.push(action.payload);

      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return { ...state, apps: arr };
    case "DESKHIDE":
      return {
        ...state,
        hide: true,
      };
    case "DESKSHOW":
      return {
        ...state,
        hide: false,
      };
    case "DESKTOGG":
      return {
        ...state,
        hide: !state.hide,
      };
    case "DESKSIZE":
      console.log("TESST!!", action);
      let newState = {
        ...state,
        desktop: { ...state.desktop, size: action.payload },
      };
      // console.log("newState", newState);
      return newState;
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

    //apps:

    case "EDGELINK":
      obj = { ...appsTemp["edge"] };
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
      appsTemp.hz += 1;
      obj.z = appsTemp.hz;
      appsTemp["edge"] = obj;
      return appsTemp;

    case "SHOWDSK":
      keys = Object.keys(appsTemp);
      for (let key of keys) {
        obj = appsTemp[key];
        if (!obj.hide) {
          obj.max = false;
          if (obj.z === appsTemp.hz) {
            appsTemp.hz -= 1;
          }
          obj.z = -1;
          appsTemp[key] = obj;
        }
      }
      return appsTemp;

    case "EXTERNAL":
      window.open(action.payload, "_blank");
      return state;

    case "OPENTERM":
      obj = { ...appsTemp["terminal"] };
      obj.dir = action.payload;
      obj.size = "full";
      obj.hide = false;
      obj.max = true;
      appsTemp.hz += 1;
      obj.z = appsTemp.hz;
      appsTemp["terminal"] = obj;
      return appsTemp;

    case "ADDAPP":
      appsTemp[action.payload.icon] = action.payload;
      appsTemp[action.payload.icon].size = "full";
      appsTemp[action.payload.icon].hide = true;
      appsTemp[action.payload.icon].max = null;
      appsTemp[action.payload.icon].z = 0;
      return appsTemp;

    case "DELAPP":
      delete appsTemp[action.payload];
      return appsTemp;

    //FodlerAndFile:
    case "CREATE_FOLDER":
      const newFolder = {
        id: Date.now(),
        type: "folder",
        info: {},
      };
      let cdir = state.data.cdir; //id of the dir
      const bin = state.data.fdata;
      let parentItem = bin.getId(cdir);
      let newFolderItem = bin.parseFolder(
        newFolder,
        action.payload,
        parentItem
      );
      parentItem.data.push(newFolderItem);
      return {
        ...state,
        files: [...state.files, newFolder],
      };
    
      case "REMOVE_FOLDER":
        {
          const folderName = action.payload;
        console.log("Remove folder with name = ", folderName);
        const cdir = state.data.cdir; //id of the dir
        const bin = state.data.fdata;
        let parentItem = bin.getId(cdir);
        let folderToRemove = null;
          console.log("Parent item:", parentItem.data);
        parentItem.data = parentItem.data.filter(item => {
          let isDifferent = item.name !== folderName;
          if(!isDifferent) {
            folderToRemove = item;
          }
          return isDifferent
        });
        if (folderToRemove === null) {
          console.error("Folder not found");
          return state;
        }
        // parentItem.data.push(newFolderItem);
        let filteredFolders = state.files.filter(file => file.id !== folderToRemove.id);
        return {
          ...state,
          files: [...filteredFolders],
        };
      }
    case "FULLSCREEN":
      {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
        return state;
    }

    case "SAVE_TEXT_DOC":
      const updatedFiles = state.files.map((file) => {
        if (file.id === action.payload.id) {
          return { ...file, content: action.payload.content };
        }
        return file;
      });
      return {
        ...state,
        files: updatedFiles,
      };

    case "CREATE_TEXT_DOC":
      console.log("demoooo");
      const newTextDoc = {
        id: Date.now(),
        name: "New Text Document.txt",
        type: "text",
      };
      return {
        ...state,
        files: [...state.files, newTextDoc],
      };

    case "LIST_DIR":
      const currentDirId = state.data.cdir;
      const currentDirItem = state.data.fdata.getId(currentDirId);

      if (currentDirItem && currentDirItem.type === "folder") {
        const dirContents = currentDirItem.data
          .map((item) => item.name)
          .join("\n");
        return {
          ...state,
          terminalOutput: dirContents,
        };
      } else {
        return {
          ...state,
          terminalOutput:
            "Error: Current directory not found or is not a folder",
        };
      }

    case "CLEAR_TERMINAL_OUTPUT":
      return {
        ...state,
        terminalOutput: "",
      };

    case "CHANGE_DIR":
      const newCdir = action.payload;
      const newDirItem = state.data.fdata.getId(newCdir);

      let newDirContents = "No contents found.";
      if (newDirItem && newDirItem.type === "folder") {
        newDirContents = newDirItem.data.map((item) => item.name).join("\n");
      }

      return {
        ...state,
        data: {
          ...state.data,
          cdir: newCdir,
        },
        terminalOutput: newDirContents,
      };

    case "UPDATE_TERMINAL_OUTPUT":
      return {
        ...state,
        terminalOutput: action.payload,
      };

    case "CREATE_FILE":
      console.log("CREATE_FILE action:", action);

      let newFile = {
        id: Date.now(),
        type: "file",
        name: action.payload,
        content: "",
        info: {
          icon: "docs",
        },
      };

      let currentDirID = state.data.cdir;
      const filesystem = state.data.fdata;
      let parentDirectory = filesystem.getId(currentDirID);

      let newFileItem = filesystem.parseFolder(
        newFile,
        action.payload,
        parentDirectory
      );
      newFileItem.content = newFile.content;

      console.log("New file item:", newFileItem);

      if (parentDirectory && parentDirectory.type === "folder") {
        parentDirectory.data.push(newFileItem);

        let newState = {
          ...state,
          files: [...state.files, newFileItem],
        };

        return newState;
      } else {
        console.error("Cannot create file in a non-folder type");
        return state;
      }

    case "OPEN_NOTEPAD":
      state.notepad.hide = false;
      state.notepad.max = true;
      state.explorer.max = false;
      const { id } = action.payload;

      const currentFile = state.files.find((file) => file.id === id);

      const content = currentFile ? currentFile.content : "";
      return {
        ...state,
        notepad: {
          ...state.notepad,
          hide: false,
          currentFileId: id,
          content: content,
        },
      };

    case "UPDATE_NOTEPAD_CONTENT": {
      const { id, content } = action.payload;
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === id ? { ...file, content } : file
        ),
      };
    }

    case "CAT_COMMAND": {
      const filename = action.payload;
      const file = state.files.find((file) => file.name === filename);

      console.log("File content:", file.content);

      if (file) {
        return {
          ...state,
          terminalOutput: file.content,
          timeStamp: Date.now(),
        };
      } else {
        return {
          ...state,
          terminalOutput: `cat: ${filename}: No such file or directory`,
        };
      }
    }

    case "PUSH_APPS_TO_DESKTOP": {
      const desktopId = state.data.fdata.special["%desktop%"];
      const desktopItem = state.data.fdata.getId(desktopId);
      if (desktopItem && Array.isArray(desktopItem.data)) {
        desktopItem.data = [];

        state.apps.forEach((app) => {
          const newItem = {
            id:
              app.id ||
              `app-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: app.name,
            type: app.type || "app",
            info: { ...app.info, icon: app.icon },
          };

          desktopItem.data.push(newItem);
        });

        state.data.fdata.setId(desktopId, desktopItem);
      }

      return {
        ...state,
        data: {
          ...state.data,
          fdata: state.data.fdata,
        },
      };
    }

    case "BOOTSTRAP_SCRIPT": {
      console.log("Execute bootstrap script!");

      const readmeContent = 
`Please, write a short function that sums two numbers, which are passed as arguments.<br/>
The function should be called <b>sumAandB()</b>.
      `;

      let tinyConfig = { content: readmeContent };
      const basicDrawingSetup = 
`Please, write a short function that sums two numbers, which are passed as arguments.<br/>
The function should be called <b>sumAandB()</b>.
      `;

      let drawing = { content: basicDrawingSetup };
      
      let spreadsheet = { content: {} };

      const jsSourceCode = 
      `// some comment
console.log("Hello from the internal code editor!");
function sum(a, b) {
  // TODO: add your implementation here
}
      `;
      let config = { content: jsSourceCode };
      return {
        ...state,
    
          application: {
            ...state.application,
            codeeditor: {
              ...state.application.codeeditor,
              ...config,
            },
            tinyeditor: {
              ...state.application.tinyeditor,
              ...tinyConfig,
            },
            drawing: {
              ...state.application.drawing,
              ...drawing,
            },
            spreadsheet: {
              ...state.application.spreadsheet,
              ...spreadsheet,
            },
          }
      };
    // return state;
    }

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
      if (changed) {
        localStorage.setItem("setting", JSON.stringify(tmpState));
      }

      keys = Object.keys(state.application);
      for (let key of keys) {
        obj = state.application[key];
        if (obj.action === action.type) {
          appsTemp = { ...state };
          switch (action.payload) {
            case "full":
              obj.size = "full";
              obj.hide = false;
              obj.max = true;
              appsTemp.hz += 1;
              obj.z = appsTemp.hz;
              break;
            case "close":
              obj.hide = true;
              obj.max = null;
              obj.z = -1;
              appsTemp.hz -= 1;
              break;
            case "mxmz":
              obj.size = obj.size !== "full" ? "full" : "mini";
              obj.hide = false;
              obj.max = true;
              appsTemp.hz += 1;
              obj.z = appsTemp.hz;
              break;
            case "togg":
              obj.hide = false;
              if (obj.z !== appsTemp.hz) {
                obj.max = true;
                appsTemp.hz += 1;
                obj.z = appsTemp.hz;
              } else {
                obj.max = !obj.max;
                appsTemp.hz = obj.max ? appsTemp.hz + 1 : appsTemp.hz - 1;
              }
              break;
            case "mnmz":
              obj.max = false;
              obj.hide = false;
              if (obj.z === appsTemp.hz) {
                appsTemp.hz -= 1;
              }
              obj.z = -1;
              break;
            case "resize":
              obj.size = "cstm";
              obj.hide = false;
              obj.max = true;
              if (obj.z !== appsTemp.hz) appsTemp.hz += 1;
              obj.z = appsTemp.hz;
              obj.dim = action.dim;
              break;
            case "front":
              obj.hide = false;
              obj.max = true;
              if (obj.z !== appsTemp.hz) {
                appsTemp.hz += 1;
                obj.z = appsTemp.hz;
              }
              break;
            default:
              break;
          }
          appsTemp[key] = obj;
          return appsTemp;
        }
      }

      return {
        ...tmp,
        ...appsTemp,
        ...tmpState,
      };
  }

  return tmp;
};

export default combinedReducer;
