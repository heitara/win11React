import React, { useState } from "react";
import { useDispatch } from "react-redux";

function TextDocEditor({ onClose }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch({
      type: "SAVE_TEXT_DOC",
      payload: {
        content,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-700">
      <div className="bg-white rounded-lg p-8 w-3/4 h-3/4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 p-1 rounded-full hover:bg-red-600"
        >
          <span className="text-white font-bold">X</span>
        </button>
        <textarea
          className="w-full h-full border-2 border-gray-200 p-2 rounded mt-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextDocEditor;
