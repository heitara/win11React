import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";
import { Excalidraw } from "@excalidraw/excalidraw";

export const Drawing = () => {
  const wnapp = useSelector((state) => state.combined.application.drawing);
  const content = useSelector((state) => state.combined.application.drawing.content) ?? "";
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // useEffect(() => {
  //   if (!excalidrawAPI) {
  //     return;
  //   }
  //   // to open the library sidebar
  //   excalidrawAPI.refresh();
  // }, [excalidrawAPI]);
  const [color, setColor] = useState("#222222");
  const [radii, setRadii] = useState(4);
  const [eraze, setErz] = useState(false);
  const [reset, setRst] = useState(false);
  const [tools, setTools] = useState([
    "#222222",
    "#e92a2a",
    "#2a52e9",
    "#12c629",
    "#e9a21e",
    "#911ee9",
    "erazer",
    "reset",
  ]);
  console.log("render drawing!!!", wnapp);
  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      // clearCanvas: false,
      // loadScene: false,
    },
  };

  return (
    <div
      className="drawing floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Drawing"
        bg="#f9f9f9"
        noinvert
      />

        <Excalidraw id={"DrawingApp_Excalidraw"} 
          UIOptions={UIOptions}
          onChange={(excalidrawElements, appState, files) => {
            console.log("excalidrawElements :", excalidrawElements, "appState: ", appState);
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          />

    </div>
  );
};
