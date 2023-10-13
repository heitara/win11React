const defState = {
  files: [],
};

const folderAndFileReducer = (state = defState, action) => {
  switch (action.type) {
    case "CREATE_FOLDER":
      const newFolder = {
        id: Date.now(),
        name: "New Folder",
        type: "folder",
      };
      return {
        ...state,
        files: [...state.files, newFolder],
      };

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
      const newTextDoc = {
        id: Date.now(),
        name: "New Text Document.txt",
        type: "text",
      };
      return {
        ...state,
        files: [...state.files, newTextDoc],
      };

    default:
      return state;
  }
};

export default folderAndFileReducer;
