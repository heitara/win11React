import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Image, ToolBar } from "../../../utils/general";

import CanvasDraw from "@win11react/react-canvas-draw";
import { Mark } from "./assets";

export const TinyEditor = () => {
  const wnapp = useSelector((state) => state.combined.application.tinyeditor);
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

  return (
    <div
      className="tinyEditor floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="TinyEditor"
        bg="#f9f9f9"
        noinvert
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">

        </div>
      </div>
    </div>
  );
};
