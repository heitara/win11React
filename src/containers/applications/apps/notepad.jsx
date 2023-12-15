import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

import store from "../../../reducers";

export const Notepad = () => {
  const wnapp = useSelector((state) => state.combined.application.notepad);

  const handleContentChange = (e) => {
    store.dispatch({ type: "UPDATE_NOTEPAD_CONTENT", payload: e.target.value });
  };

  return (
    <div
      className="notepad floatTab dpShad"
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
        name="Untitled - Notepad"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="flex text-xs py-2 topBar">
          <div className="mx-2">File</div>
          <div className="mx-4">Edit</div>
          <div className="mx-4">View</div>
        </div>
        <div className="restWindow h-full flex-grow">
          <div className="w-full h-full overflow-hidden">
            <textarea
              className="noteText win11Scroll"
              id="textpad"
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
