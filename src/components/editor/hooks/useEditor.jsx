import { useDispatch, useSelector } from "react-redux";
import {
  getFileContentByIdApiCall,
  getFilesApiCall,
  saveFileContentByIdApiCall,
} from "../../../api/files.api";
import {
  saveFile,
  setFiles,
  updateFileContent,
} from "../../../redux/features/files/filesSlice";
import { useState } from "react";

export const useEditor = () => {
  // states
  const dispatch = useDispatch();
  const [currentFileId, setCurrentFileId] = useState(null);
  const [fileContentLoading, setFileContentLoading] = useState(true);
  const files = useSelector((state) => state.files);

  const getFiles = async () => {
    const response = await getFilesApiCall();

    if (response.success) {
      dispatch(
        setFiles(response.data.map((file) => ({ ...file, content: null })))
      );
      setCurrentFileId(response.data[0].id);
    } else {
      console.error(response.message);
    }
  };

  const isContentPresent = (id) => {
    const file = files.find((f) => f.id == id);
    if (file) {
      return file.content != null;
    }
    return false;
  };

  const getCurrentFileContent = async () => {
    setFileContentLoading(true);

    // if content is not present only then call API
    if (!isContentPresent(currentFileId)) {
      const response = await getFileContentByIdApiCall(currentFileId);

      if (response.success) {
        dispatch(
          updateFileContent({ id: currentFileId, content: response.data })
        );
      } else {
        console.error(response.message);
      }
    }

    setFileContentLoading(false);
  };

  const handleEditorChange = (value) => {
    dispatch(updateFileContent({ id: currentFileId, content: value }));
  };

  const handleSave = async () => {
    const response = await saveFileContentByIdApiCall(currentFileId);

    if (response.success) {
      dispatch(saveFile({ id: currentFileId }));
    } else {
      console.error(response.message);
    }
  };

  return {
    getFiles,
    currentFileId,
    getCurrentFileContent,
    fileContentLoading,
    setCurrentFileId,
    handleEditorChange,
    handleSave,
  };
};
