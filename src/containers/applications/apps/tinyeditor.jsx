import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";
import { Editor } from "@tinymce/tinymce-react";

export const TinyEditor = () => {
  const wnapp = useSelector((state) => state.combined.application.tinyeditor);
  const content = useSelector((state) => state.combined.application.tinyeditor.content) ?? "";
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

  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  let api = import.meta.env.VITE_APP_TINY_API;
  if (api === undefined || api === "") {
    console.error("Tiny API key not found, please add it to .env file as VITE_APP_TINY_API=<your_key>");
  }

  // TODO: add markdown support with the following plugin
  // https://github.com/prathamVaidya/supercode-tinymce-plugin

  return (
    <div
      className="tinyEditor floatTab dpShad"
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
        name="TinyEditor"
        bg="#f9f9f9"
        noinvert
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
        <Editor apiKey={api} initialValue={content} 
        init={{
          branding: false,
          resize: false
        }} />
        </div>
      </div>
    </div>
  );
};
