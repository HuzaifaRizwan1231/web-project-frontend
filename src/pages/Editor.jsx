import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import FileExplorer from "../components/editor/FileExplorer/FileExplorer";
import { useSelector } from "react-redux";
import { useEditor } from "../components/editor/hooks/useEditor";

// languages name corresponding to extension
const languages = {
  js: "javascript",
  java: "java",
  c: "c",
  py: "python",
  html: "html",
  css: "css",
};

const Editor = () => {
  const {
    getFiles,
    currentFileId,
    getCurrentFileContent,
    fileContentLoading,
    setCurrentFileId,
    handleEditorChange,
    handleSave,
  } = useEditor();

  const files = useSelector((state) => state.files);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (files) {
      setCurrentFile(files && files.find((f) => f.id == currentFileId));
    }
  }, [files, currentFileId]);

  useEffect(() => {
    if (currentFileId) {
      getCurrentFileContent();
    }
  }, [currentFileId]);

  // runs when the editor is mounted
  const handleEditorMount = (editor) => {
    // Bind 'Ctrl + S' to custom save function
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave(); // Trigger your custom save logic
    });
  };

  return (
    <div className="grid grid-cols-5 text-white h-screen">
      <div className="col-span-1">
        <FileExplorer
          setCurrentFileId={setCurrentFileId}
          currentFileId={currentFileId}
        />
      </div>
      <div className="col-span-3 bg-dark-secondary">
        {files && !fileContentLoading && currentFile ? (
          <MonacoEditor
            defaultLanguage={languages[currentFile.extension]}
            defaultValue={currentFile.content}
            language={languages[currentFile.extension]}
            value={currentFile.content}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorMount}
          />
        ) : (
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        )}
      </div>
      <div className="col-span-1">
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
          {currentFile && !currentFile.saved && (
            <button
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
