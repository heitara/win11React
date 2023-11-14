import { Bin } from "../utils/bin";
import fdata from "./dir.json";

export const filesDefState = {
  cdir: "%user%",
  hist: [],
  hid: 0,
  view: 1,
};

filesDefState.hist.push(filesDefState.cdir);
filesDefState.testData = new Bin();
filesDefState.testData.parse(fdata);

const fileReducer = (state = filesDefState, action) => {
  var tmp = { ...state };
  var navHist = false;

  switch (action.type) {
    case "FILEDIR":
      tmp.cdir = action.payload;
      break;
    case "FILEPATH":
      var pathid = tmp.data.parsePath(action.payload);
      if (pathid) {
        tmp.cdir = pathid;
      }
      break;
    case "FILEBACK":
      var item = tmp.data.getId(tmp.cdir);
      if (item.host) {
        tmp.cdir = item.host.id;
      }
      break;
    case "FILEVIEW":
      tmp.view = action.payload;
      break;
    case "FILEPREV":
      tmp.hid--;
      if (tmp.hid < 0) tmp.hid = 0;
      navHist = true;
      break;
    case "FILENEXT":
      tmp.hid++;
      if (tmp.hid > tmp.hist.length - 1) {
        tmp.hid = tmp.hist.length - 1;
      }
      navHist = true;
      break;
    default:
      break;
  }

  if (!navHist && tmp.cdir !== tmp.hist[tmp.hid]) {
    tmp.hist.splice(tmp.hid + 1);
    tmp.hist.push(tmp.cdir);
    tmp.hid = tmp.hist.length - 1;
  }

  tmp.cdir = tmp.hist[tmp.hid];
  if (tmp.cdir.includes("%")) {
    if (tmp.data.special[tmp.cdir] != null) {
      tmp.cdir = tmp.data.special[tmp.cdir];
      tmp[tmp.hid] = tmp.cdir;
    }
  }

  tmp.cpath = tmp.data.getPath(tmp.cdir);
  return tmp;
};

export default fileReducer;
