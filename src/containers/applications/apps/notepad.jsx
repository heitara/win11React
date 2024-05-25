import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotepadContent } from "../../../actions";
import { ToolBar } from "../../../utils/general";

import store from "../../../reducers";

export const Notepad = () => {
  const wnapp = useSelector((state) => state.combined.application.notepad);
  const dispatch = useDispatch();

  const files = useSelector((state) => state.combined.files);
  const currentFileId = localStorage.getItem("currentFileId");

  const currentFile = files.find((file) => file.id === currentFileId);

  const [content, setContent] = useState(
    currentFile ? currentFile.content : ""
  );

  const handleContentChange = (event) => {
    setContent(event.target.value);
    dispatch({
      type: "UPDATE_NOTEPAD_CONTENT",
      payload: { id: currentFileId, content: event.target.value },
    });
  };

  useEffect(() => {
    const currentFile = files.find((file) => file.id === currentFileId);
    setContent(currentFile ? currentFile.content : "");
  }, [currentFileId, files]);

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
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
